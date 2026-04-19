---
layout: page
title: Publications
subtitle: Research papers co-authored by AIXLab members
---

<div data-aix-filters="publications">

<div class="aix-filters">
  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Type</span>
    <button class="aix-chip is-active" data-filter="type" data-value="">All</button>
    <button class="aix-chip" data-filter="type" data-value="journal">Journal</button>
    <button class="aix-chip" data-filter="type" data-value="conference">Conference</button>
    <button class="aix-chip" data-filter="type" data-value="preprint">Preprint</button>
  </div>

  {% assign all_tags = site.data.publications | map: "tags" | join: "," | split: "," | uniq | sort %}
  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Topic</span>
    <button class="aix-chip is-active" data-filter="tag" data-value="">All</button>
    {% for tag in all_tags %}
      {% assign t = tag | strip %}
      {% if t != "" %}<button class="aix-chip" data-filter="tag" data-value="{{ t | downcase }}">{{ t }}</button>{% endif %}
    {% endfor %}
  </div>

  {% assign all_domains = site.data.publications | map: "domain" | join: "," | split: "," | uniq | sort %}
  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Domain</span>
    <button class="aix-chip is-active" data-filter="domain" data-value="">All</button>
    {% for domain in all_domains %}
      {% assign d = domain | strip %}
      {% if d != "" %}<button class="aix-chip" data-filter="domain" data-value="{{ d | downcase }}">{{ d }}</button>{% endif %}
    {% endfor %}
  </div>

  <div class="aix-filter-row">
    <span class="aix-filter-row__label">Search</span>
    <input type="search" class="aix-search" data-filter="search" placeholder="Search title, authors, venue…">
  </div>
</div>

{% assign years = site.data.publications | map: "year" | uniq | sort | reverse %}

{% for year in years %}
  {% assign year_pubs = site.data.publications | where: "year", year %}
  <section class="aix-filter-section" id="year-{{ year }}">
    <h2 class="aix-year">{{ year }}</h2>
    {% for pub in year_pubs %}
      {% assign tags_lc = pub.tags | join: "," | downcase %}
      {% assign domains_lc = pub.domain | join: "," | downcase %}
      {% capture search_blob %}{{ pub.title }} {{ pub.authors }} {{ pub.venue }}{% endcapture %}
      <article class="aix-pub aix-filterable"
               data-type="{{ pub.type }}"
               data-tags="{{ tags_lc }}"
               data-domain="{{ domains_lc }}"
               data-search="{{ search_blob | downcase | strip }}">
        <h3 class="aix-pub__title">
          {% if pub.url %}<a href="{{ pub.url }}">{{ pub.title }}</a>
          {% elsif pub.doi %}<a href="https://doi.org/{{ pub.doi }}">{{ pub.title }}</a>
          {% else %}{{ pub.title }}{% endif %}
        </h3>
        <div class="aix-pub__authors">
          {% assign author_list = pub.authors | split: ", " %}
          {% for author in author_list %}
            {% assign is_member = false %}
            {% for gm in pub.group_authors %}{% if gm == author %}{% assign is_member = true %}{% endif %}{% endfor %}
            {% if is_member %}<span class="aix-pub__member">{{ author }}</span>{% else %}{{ author }}{% endif %}{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </div>
        <div class="aix-pub__venue">
          {{ pub.venue }}{% if pub.volume %}, {{ pub.volume }}{% endif %}{% if pub.pages %}, pp. {{ pub.pages }}{% endif %}
        </div>
        <div class="aix-pub__meta">
          {% case pub.type %}
            {% when "journal" %}<span class="aix-pill aix-pill--brand">Journal</span>
            {% when "conference" %}<span class="aix-pill">Conference</span>
            {% when "preprint" %}<span class="aix-pill aix-pill--muted">Preprint</span>
            {% when "book-chapter" %}<span class="aix-pill aix-pill--muted">Book chapter</span>
          {% endcase %}
          {% for tag in pub.tags %}<span class="aix-pill aix-pill--muted">{{ tag }}</span>{% endfor %}
        </div>
        {% if pub.doi or pub.url %}
          <div class="aix-pub__links">
            {% if pub.doi %}<a href="https://doi.org/{{ pub.doi }}">doi:{{ pub.doi }}</a>{% endif %}
            {% if pub.url %}<a href="{{ pub.url }}">Read →</a>{% endif %}
          </div>
        {% endif %}
      </article>
    {% endfor %}
  </section>
{% endfor %}

<div class="aix-empty" style="display:none">No publications match the current filters.</div>

</div>
