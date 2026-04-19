/* AIXLab filter logic.
 * Initialises filter bars declared with data-aix-filters="<scopeId>".
 * Items to filter are any element with class `aix-filterable` inside the scope.
 *
 * Filter sources on each item (all optional):
 *   data-type   - single type (journal, conference, preprint, ...)
 *   data-tags   - comma-separated topic tags
 *   data-domain - comma-separated domains
 *   data-status - active | completed
 *   data-role   - pi | chalmers-pi | participating
 *   data-search - free-text haystack (lowercased title + authors + venue)
 *
 * Filter controls inside the bar:
 *   <button class="aix-chip" data-filter="type|tag|domain|status|role" data-value="...">
 *   <input class="aix-search" data-filter="search">
 *
 * Multiple chips within the same data-filter group are OR'd. Different groups are AND'd.
 * Chip with data-value="" acts as "All" and clears its group when clicked.
 *
 * Year / group containers (elements with class `aix-filter-section`) hide when
 * they contain no visible items after filtering.
 */

(function () {
  'use strict';

  function normalise(str) { return (str || '').toLowerCase().trim(); }
  function splitCsv(str) {
    if (!str) return [];
    return str.split(',').map(function (s) { return normalise(s); }).filter(Boolean);
  }

  function initScope(scopeRoot) {
    var filterBar = scopeRoot.querySelector('.aix-filters');
    if (!filterBar) return;
    var items = Array.prototype.slice.call(scopeRoot.querySelectorAll('.aix-filterable'));
    var sections = Array.prototype.slice.call(scopeRoot.querySelectorAll('.aix-filter-section'));
    var emptyMsg = scopeRoot.querySelector('.aix-empty');

    var state = { type: [], tag: [], domain: [], status: [], role: [], search: '' };

    function itemMatches(item) {
      if (state.type.length && state.type.indexOf(normalise(item.dataset.type)) === -1) return false;
      if (state.status.length && state.status.indexOf(normalise(item.dataset.status)) === -1) return false;
      if (state.role.length && state.role.indexOf(normalise(item.dataset.role)) === -1) return false;

      if (state.tag.length) {
        var itemTags = splitCsv(item.dataset.tags);
        if (!state.tag.some(function (t) { return itemTags.indexOf(t) !== -1; })) return false;
      }
      if (state.domain.length) {
        var itemDomains = splitCsv(item.dataset.domain);
        if (!state.domain.some(function (d) { return itemDomains.indexOf(d) !== -1; })) return false;
      }
      if (state.search) {
        var hay = normalise(item.dataset.search || item.textContent);
        if (hay.indexOf(state.search) === -1) return false;
      }
      return true;
    }

    function applyFilters() {
      var visibleCount = 0;
      items.forEach(function (item) {
        var match = itemMatches(item);
        item.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      sections.forEach(function (section) {
        var visibleInside = section.querySelectorAll('.aix-filterable:not([style*="display: none"])').length;
        section.style.display = visibleInside > 0 ? '' : 'none';
      });
      if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? '' : 'none';
    }

    // Chip group toggling
    filterBar.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.aix-chip');
      if (!chip) return;
      var group = chip.dataset.filter;
      var value = normalise(chip.dataset.value);
      if (!group) return;

      var groupChips = filterBar.querySelectorAll('.aix-chip[data-filter="' + group + '"]');

      if (value === '') {
        // "All" - clear this group
        state[group] = [];
        groupChips.forEach(function (c) { c.classList.toggle('is-active', normalise(c.dataset.value) === ''); });
      } else {
        var idx = state[group].indexOf(value);
        if (idx === -1) {
          state[group].push(value);
        } else {
          state[group].splice(idx, 1);
        }
        // Update active classes
        groupChips.forEach(function (c) {
          var v = normalise(c.dataset.value);
          if (v === '') {
            c.classList.toggle('is-active', state[group].length === 0);
          } else {
            c.classList.toggle('is-active', state[group].indexOf(v) !== -1);
          }
        });
      }
      applyFilters();
    });

    // Search input
    var searchInput = filterBar.querySelector('.aix-search');
    if (searchInput) {
      var debounceTimer = null;
      searchInput.addEventListener('input', function (ev) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          state.search = normalise(ev.target.value);
          applyFilters();
        }, 120);
      });
    }

    applyFilters();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var scopes = document.querySelectorAll('[data-aix-filters]');
    scopes.forEach(initScope);
  });
})();
