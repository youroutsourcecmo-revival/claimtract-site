# Roadmap statuses update themselves

assets/roadmap.json feeds the Roadmap screen in the Back office. Nobody edits statuses by hand.

When you build a roadmap feature, put the marker on the feature's element in the app:
- data-wip="<id>" while it is being built (shows In progress)
- data-built="<id>" once it is live (shows a green Built check)

A GitHub Action runs on every push and every hour and updates roadmap.json. The ids are in assets/roadmap.json.
