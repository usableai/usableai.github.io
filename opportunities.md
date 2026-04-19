---
layout: page
title: Opportunities
subtitle: Join AIXLab
---

{% assign open_opps = site.data.opportunities | where: "status", "open" %}
{% assign past_opps = site.data.opportunities | where: "status", "past" %}

<h2 class="aix-section-title" style="margin-top:1rem">Open positions</h2>

{% if open_opps.size > 0 %}
{% for opp in open_opps %}
<div class="aix-opportunity aix-opportunity--split">
<div class="aix-opportunity__col">
<p class="aix-opportunity__title">{{ opp.title }}</p>
{% if opp.subtitle %}<p class="aix-opportunity__subtitle">{{ opp.subtitle }}</p>{% endif %}
<p class="aix-opportunity__meta">
{% if opp.date %}{{ opp.date }}{% endif %}
{% if opp.date and opp.tags %} | {% endif %}
{% if opp.tags %}{{ opp.tags | join: ", " }}{% endif %}
</p>
{% if opp.contact %}<p class="aix-opportunity__contact">Contact: <a href="mailto:{{ opp.contact }}">{{ opp.contact }}</a></p>{% endif %}
</div>
<div class="aix-opportunity__col aix-opportunity__col--action">
{% if opp.url %}<a href="{{ opp.url }}">Link →</a>{% endif %}
</div>
</div>
{% endfor %}
{% else %}
<p>No open positions right now. Email <a href="mailto:yinan@chalmers.se">yinan@chalmers.se</a> if you're interested in joining.</p>
{% endif %}

<h2 class="aix-section-title" style="margin-top:3rem">Previous positions</h2>

{% for opp in past_opps %}
<div class="aix-opportunity aix-opportunity--past aix-opportunity--split">
<div class="aix-opportunity__col">
<p class="aix-opportunity__title">{{ opp.title }}</p>
{% if opp.subtitle %}<p class="aix-opportunity__subtitle">{{ opp.subtitle }}</p>{% endif %}
<p class="aix-opportunity__meta">
{% if opp.date %}{{ opp.date }}{% endif %}
{% if opp.date and opp.tags %} | {% endif %}
{% if opp.tags %}{{ opp.tags | join: ", " }}{% endif %}
</p>
</div>
<div class="aix-opportunity__col aix-opportunity__col--action">
{% if opp.url %}<a href="{{ opp.url }}">Archived listing →</a>{% endif %}
</div>
</div>
{% endfor %}
