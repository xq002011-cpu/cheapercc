# CCBoss - Simplest AI CLI Ever

## Install (1 command):

```bash
cd ~/CC/ccboss && npm install && npm link
```

## Setup (auto-detects your API key):

```bash
cb setup
```

**That's it!** If you already have a SkillBoss API key at `~/.config/skillboss/api-key`, it auto-configures. Otherwise, it asks you to paste one.

## Use:

```bash
cb ask "Hello!"           # Quick question
cb                        # Interactive chat
```

## Get API Key (if needed):

Visit: **https://skillboss.co/console**

---

## Advanced Setup (optional):

Want to configure multiple providers?

```bash
cb setup --advanced
```

This shows the full wizard with all 15+ providers.

---

## All Commands:

```bash
cb                        # Chat (shortest!)
cb ask "question"         # Quick ask
cb setup                  # Simple setup
cb setup --advanced       # Full setup wizard
cb models                 # List models
cb test                   # Test connection
cb config                 # View config
cb --help                 # Help
```

## Aliases (all work):

- `cb` - 2 chars (fastest!)
- `ccb` - 3 chars
- `ccboss` - full
- `boss` - cool

---

**That's literally everything. 2 commands to install, 1 to setup, done. 🎉**
