---
layout: page
title: Team
subtitle: "The people behind AIXLab ♥ (alphabetic order)"
---

{% assign order = "organizer,phd,postdoc,collaborator,alumni" | split: "," %}
{% assign titles = "Organizers,PhD Students,Postdocs,Collaborators,Alumni" | split: "," %}

{% for group in order %}
{% assign group_members = site.data.members | where: "group", group %}
{% if group_members and group_members.size > 0 %}
{% assign idx = forloop.index0 %}
<section class="aix-team-group{% if group == 'alumni' %} aix-team-group--alumni{% endif %}">
<h2 class="aix-team-group__heading">{{ titles[idx] }}</h2>
<div class="aix-team-grid">
{% for member in group_members %}
<div class="aix-member-card">
<img src="{{ member.image }}" alt="Photo of {{ member.name }}">
<div class="aix-member-card__name">
{% if member.bio_link %}<a href="{{ member.bio_link }}">{{ member.name }}</a>
{% elsif member.external_link %}<a href="{{ member.external_link }}">{{ member.name }}</a>
{% else %}{{ member.name }}{% endif %}
</div>
<div class="aix-member-card__role">{{ member.role }}</div>
{% if member.affiliation %}
<div class="aix-member-card__role" style="font-size:.85rem">
{% if member.affiliation_link %}<a href="{{ member.affiliation_link }}">{{ member.affiliation }}</a>
{% else %}{{ member.affiliation }}{% endif %}
</div>
{% endif %}
{% if member.tags %}{% for tag in member.tags %}<span class="aix-member-card__tag">{{ tag }}</span>{% endfor %}{% endif %}
</div>
{% endfor %}
</div>
</section>
{% endif %}
{% endfor %}
