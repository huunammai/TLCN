﻿(function($, w, undefined) {
    w.footable = {
        options: {
            delay: 100,
            breakpoints: {
                phone: 480,
                tablet: 1024
            },
            parsers: {
                alpha: function(cell) {
                    return $(cell).data('value') || $.trim($(cell).text());
                }
            },
            calculateWidthAndHeightOverride: null,
            toggleSelector: ' > tbody > tr:not(.footable-row-detail)',
            columnDataSelector: '> thead > tr:last-child > th, > thead > tr:last-child > td',
            createDetail: function(element, data) {
                var groups = {
                    '_none': {
                        'name': null,
                        'data': []
                    }
                };
                for (var i = 0; i < data.length; i++) {
                    var groupid = data[i].group;
                    if (groupid != null) {
                        if (!(groupid in groups))
                            groups[groupid] = {
                                'name': data[i].groupName,
                                'data': []
                            };
                        groups[groupid].data.push(data[i]);
                    } else {
                        groups._none.data.push(data[i]);
                    }
                }
                for (var group in groups) {
                    if (groups[group].data.length == 0) continue;
                    if (group != '_none') element.append('<h4>' + groups[group].name + '</h4>');
                    for (var j = 0; j < groups[group].data.length; j++) {
                        var separator = (groups[group].data[j].name) ? ':' : '';
                        element.append('<div><strong>' + groups[group].data[j].name + '</strong> ' + separator + ' ' + groups[group].data[j].display + '</div>');
                    }
                }
            },
            classes: {
                loading: 'footable-loading',
                loaded: 'footable-loaded',
                sorted: 'footable-sorted',
                descending: 'footable-sorted-desc',
                indicator: 'footable-sort-indicator'
            },
            debug: false
        },
        version: {
            major: 0,
            minor: 5,
            toString: function() {
                return w.footable.version.major + '.' + w.footable.version.minor;
            },
            parse: function(str) {
                version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(str);
                return {
                    major: parseInt(version[1]) || 0,
                    minor: parseInt(version[2]) || 0,
                    patch: parseInt(version[3]) || 0
                };
            }
        },
        plugins: {
            _validate: function(plugin) {
                if (typeof plugin['name'] !== 'string') {
                    if (w.footable.options.debug == true) console.error('Validation failed, plugin does not implement a string property called "name".', plugin);
                    return false;
                }
                if (!$.isFunction(plugin['init'])) {
                    if (w.footable.options.debug == true) console.error('Validation failed, plugin "' + plugin['name'] + '" does not implement a function called "init".', plugin);
                    return false;
                }
                if (w.footable.options.debug == true) console.log('Validation succeeded for plugin "' + plugin['name'] + '".', plugin);
                return true;
            },
            registered: [],
            register: function(plugin, options) {
                if (w.footable.plugins._validate(plugin)) {
                    w.footable.plugins.registered.push(plugin);
                    if (options != undefined && typeof options === 'object') $.extend(true, w.footable.options, options);
                    if (w.footable.options.debug == true) console.log('Plugin "' + plugin['name'] + '" has been registered with the Foobox.', plugin);
                }
            },
            init: function(instance) {
                for (var i = 0; i < w.footable.plugins.registered.length; i++) {
                    try {
                        w.footable.plugins.registered[i]['init'](instance);
                    } catch (err) {
                        if (w.footable.options.debug == true) console.error(err);
                    }
                }
            }
        }
    };
    var instanceCount = 0;
    $.fn.footable = function(options) {
        options = options || {};
        var o = $.extend(true, {}, w.footable.options, options);
        return this.each(function() {
            instanceCount++;
            this.footable = new Footable(this, o, instanceCount);
        });
    };

    function Timer() {
        var t = this;
        t.id = null;
        t.busy = false;
        t.start = function(code, milliseconds) {
            if (t.busy) {
                return;
            }
            t.stop();
            t.id = setTimeout(function() {
                code();
                t.id = null;
                t.busy = false;
            }, milliseconds);
            t.busy = true;
        };
        t.stop = function() {
            if (t.id != null) {
                clearTimeout(t.id);
                t.id = null;
                t.busy = false;
            }
        };
    };

    function Footable(t, o, id) {
        var ft = this;
        ft.id = id;
        ft.table = t;
        ft.options = o;
        ft.breakpoints = [];
        ft.breakpointNames = '';
        ft.columns = {};
        var opt = ft.options;
        var cls = opt.classes;
        var indexOffset = 0;
        ft.timers = {
            resize: new Timer(),
            register: function(name) {
                ft.timers[name] = new Timer();
                return ft.timers[name];
            }
        };
        w.footable.plugins.init(ft);
        ft.init = function() {
            var $window = $(w),
                $table = $(ft.table);
            if ($table.hasClass(cls.loaded)) {
                ft.raise('footable_already_initialized');
                return;
            }
            $table.addClass(cls.loading);
            $table.find(opt.columnDataSelector).each(function() {
                var data = ft.getColumnData(this);
                ft.columns[data.index] = data;
                if (data.className != null) {
                    var selector = '',
                        first = true;
                    $.each(data.matches, function(m, match) {
                        if (!first) {
                            selector += ', ';
                        }
                        selector += '> tbody > tr:not(.footable-row-detail) > td:nth-child(' + (parseInt(match) + 1) + ')';
                        first = false;
                    });
                    $table.find(selector).not('.footable-cell-detail').addClass(data.className);
                }
            });
            for (var name in opt.breakpoints) {
                ft.breakpoints.push({
                    'name': name,
                    'width': opt.breakpoints[name]
                });
                ft.breakpointNames += (name + ' ');
            }
            ft.breakpoints.sort(function(a, b) {
                return a['width'] - b['width'];
            });
            ft.bindToggleSelectors();
            ft.raise('footable_initializing');
            $table.bind('footable_initialized', function() {
                ft.resize();
                $table.removeClass(cls.loading);
                $table.find('[data-init="hide"]').hide();
                $table.find('[data-init="show"]').show();
                $table.addClass(cls.loaded);
            });
            $table.bind('footable_resize', function() {
                ft.resize();
            });
            $window.bind('resize.footable', function() {
                ft.timers.resize.stop();
                ft.timers.resize.start(function() {
                    ft.resize();
                }, opt.delay);
            });
            ft.raise('footable_initialized');
        };
        ft.bindToggleSelectors = function() {
            var $table = $(ft.table);
            $table.find(opt.toggleSelector).unbind('click.footable').bind('click.footable', function(e) {
                if ($table.is('.breakpoint') && $(e.target).is('td')) {
                    var $row = $(this).is('tr') ? $(this) : $(this).parents('tr:first');
                    ft.toggleDetail($row.get(0));
                }
            });
        };
        ft.parse = function(cell, column) {
            var parser = opt.parsers[column.type] || opt.parsers.alpha;
            return parser(cell);
        };
        ft.getColumnData = function(th) {
            var $th = $(th),
                hide = $th.data('hide'),
                index = $th.index();
            hide = hide || '';
            hide = hide.split(',');
            var data = {
                'index': index,
                'hide': {},
                'type': $th.data('type') || 'alpha',
                'name': $.trim($th.data('name') || $th.text()),
                'ignore': $th.data('ignore') || false,
                'className': $th.data('class') || null,
                'matches': [],
                'names': {},
                'group': $th.data('group') || null,
                'groupName': null
            };
            if (data.group != null) {
                var $group = $(ft.table).find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]').first();
                data.groupName = ft.parse($group, {
                    'type': 'alpha'
                });
            }
            var pcolspan = parseInt($th.prev().attr('colspan') || 0);
            indexOffset += pcolspan > 1 ? pcolspan - 1 : 0;
            var colspan = parseInt($th.attr('colspan') || 0),
                curindex = data.index + indexOffset;
            if (colspan > 1) {
                var names = $th.data('names');
                names = names || '';
                names = names.split(',');
                for (var i = 0; i < colspan; i++) {
                    data.matches.push(i + curindex);
                    if (i < names.length) data.names[i + curindex] = names[i];
                }
            } else {
                data.matches.push(curindex);
            }
            data.hide['default'] = ($th.data('hide') === "all") || ($.inArray('default', hide) >= 0);
            for (var name in opt.breakpoints) {
                data.hide[name] = ($th.data('hide') === "all") || ($.inArray(name, hide) >= 0);
            }
            var e = ft.raise('footable_column_data', {
                'column': {
                    'data': data,
                    'th': th
                }
            });
            return e.column.data;
        };
        ft.getViewportWidth = function() {
            return window.innerWidth || (document.body ? document.body.offsetWidth : 0);
        };
        ft.getViewportHeight = function() {
            return window.innerHeight || (document.body ? document.body.offsetHeight : 0);
        };
        ft.calculateWidthAndHeight = function($table, info) {
            if (jQuery.isFunction(opt.calculateWidthAndHeightOverride)) {
                return opt.calculateWidthAndHeightOverride($table, info);
            }
            if (info.viewportWidth < info.width) info.width = info.viewportWidth;
            if (info.viewportHeight < info.height) info.height = info.viewportHeight;
            return info;
        };
        ft.hasBreakpointColumn = function(breakpoint) {
            for (var c in ft.columns) {
                if (ft.columns[c].hide[breakpoint]) {
                    return true;
                }
            }
            return false;
        };
        ft.resize = function() {
            var $table = $(ft.table);
            var info = {
                'width': $table.width(),
                'height': $table.height(),
                'viewportWidth': ft.getViewportWidth(),
                'viewportHeight': ft.getViewportHeight(),
                'orientation': null
            };
            info.orientation = info.viewportWidth > info.viewportHeight ? 'landscape' : 'portrait';
            info = ft.calculateWidthAndHeight($table, info);
            var pinfo = $table.data('footable_info');
            $table.data('footable_info', info);
            ft.raise('footable_resizing', {
                'old': pinfo,
                'info': info
            });
            if (!pinfo || ((pinfo && pinfo.width && pinfo.width != info.width) || (pinfo && pinfo.height && pinfo.height != info.height))) {
                var current = null,
                    breakpoint;
                for (var i = 0; i < ft.breakpoints.length; i++) {
                    breakpoint = ft.breakpoints[i];
                    if (breakpoint && breakpoint.width && info.width <= breakpoint.width) {
                        current = breakpoint;
                        break;
                    }
                }
                var breakpointName = (current == null ? 'default' : current['name']);
                var hasBreakpointFired = ft.hasBreakpointColumn(breakpointName);
                $table.removeClass('default breakpoint').removeClass(ft.breakpointNames).addClass(breakpointName + (hasBreakpointFired ? ' breakpoint' : '')).find('> thead > tr:last-child > th').each(function() {
                    var data = ft.columns[$(this).index()],
                        selector = '',
                        first = true;
                    $.each(data.matches, function(m, match) {
                        if (!first) {
                            selector += ', ';
                        }
                        var count = match + 1;
                        selector += '> tbody > tr:not(.footable-row-detail) > td:nth-child(' + count + ')';
                        selector += ', > tfoot > tr:not(.footable-row-detail) > td:nth-child(' + count + ')';
                        selector += ', > colgroup > col:nth-child(' + count + ')';
                        first = false;
                    });
                    selector += ', > thead > tr[data-group-row="true"] > th[data-group="' + data.group + '"]';
                    var $column = $table.find(selector).add(this);
                    if (data.hide[breakpointName] == false) $column.show();
                    else $column.hide();
                    if ($table.find('> thead > tr.footable-group-row').length == 1) {
                        var $groupcols = $table.find('> thead > tr:last-child > th[data-group="' + data.group + '"]:visible, > thead > tr:last-child > th[data-group="' + data.group + '"]:visible'),
                            $group = $table.find('> thead > tr.footable-group-row > th[data-group="' + data.group + '"], > thead > tr.footable-group-row > td[data-group="' + data.group + '"]'),
                            groupspan = 0;
                        $.each($groupcols, function() {
                            groupspan += parseInt($(this).attr('colspan') || 1);
                        });
                        if (groupspan > 0) $group.attr('colspan', groupspan).show();
                        else $group.hide();
                    }
                }).end().find('> tbody > tr.footable-detail-show').each(function() {
                    ft.createOrUpdateDetailRow(this);
                });
                $table.find('> tbody > tr.footable-detail-show:visible').each(function() {
                    var $next = $(this).next();
                    if ($next.hasClass('footable-row-detail')) {
                        if (!hasBreakpointFired) $next.hide();
                        else $next.show();
                    }
                });
                $table.find('> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column').removeClass('footable-last-column');
                $table.find('> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column').removeClass('footable-first-column');
                $table.find('> thead > tr, > tbody > tr').find('> th:visible:last, > td:visible:last').addClass('footable-last-column').end().find('> th:visible:first, > td:visible:first').addClass('footable-first-column');
                ft.raise('footable_breakpoint_' + breakpointName, {
                    'info': info
                });
            }
            ft.raise('footable_resized', {
                'old': pinfo,
                'info': info
            });
        };
        ft.toggleDetail = function(actualRow) {
            var $row = $(actualRow),
                created = ft.createOrUpdateDetailRow($row.get(0)),
                $next = $row.next();
            if (!created && $next.is(':visible')) {
                $row.removeClass('footable-detail-show');
                if ($next.hasClass('footable-row-detail')) $next.hide();
            } else {
                $row.addClass('footable-detail-show');
                $next.show();
            }
        };
        ft.getColumnFromTdIndex = function(index) {
            var result = null;
            for (var column in ft.columns) {
                if ($.inArray(index, ft.columns[column].matches) >= 0) {
                    result = ft.columns[column];
                    break;
                }
            }
            return result;
        };
        ft.createOrUpdateDetailRow = function(actualRow) {
            var $row = $(actualRow),
                $next = $row.next(),
                $detail, values = [];
            if ($row.is(':hidden')) return false;
            ft.raise('footable_rowdetailupdated', {
                'row': $row,
                'detail': $next
            });
            $row.find('> td:hidden').each(function() {
                var index = $(this).index(),
                    column = ft.getColumnFromTdIndex(index),
                    name = column.name;
                if (column.ignore == true) return true;
                if (index in column.names) name = column.names[index];
                values.push({
                    'name': name,
                    'value': ft.parse(this, column),
                    'display': $.trim($(this).html()),
                    'group': column.group,
                    'groupName': column.groupName
                });
                return true;
            });
            if (values.length == 0) return false;
            var colspan = $row.find('> td:visible').length;
            var exists = $next.hasClass('footable-row-detail');
            if (!exists) {
                $next = $('<tr class="footable-row-detail"><td class="footable-cell-detail"><div class="footable-row-detail-inner"></div></td></tr>');
                $row.after($next);
            }
            $next.find('> td:first').attr('colspan', colspan);
            $detail = $next.find('.footable-row-detail-inner').empty();
            opt.createDetail($detail, values);
            return !exists;
        };
        ft.raise = function(eventName, args) {
            args = args || {};
            var def = {
                'ft': ft
            };
            $.extend(true, def, args);
            var e = $.Event(eventName, def);
            if (!e.ft) {
                $.extend(true, e, def);
            }
            $(ft.table).trigger(e);
            return e;
        };
        ft.init();
        return ft;
    };
})(jQuery, window);