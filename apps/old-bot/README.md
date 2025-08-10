# Banana logger

banana logger is a discord bot that focuses in logging your server's events, like bans, deleted messages, member joins and more with all the customization you need.

# Self-host

<!-- // TODO -->

# Bot usage

## Config per channel

### Shows the configuration for the current channel

`/config show`

### Starts logging or stops logging the specified events

`/conifg toggle-log [event]:all|eventName`

### Ignores any event coming from the specified channel

`/config toggle-ignore-channel [#channel]`

### Explicitly logs an event that comes from the specified channel, ignoring if it's ignored in the global configuration

`/config toggle-watch-channel [#channel]`

### Ignores any event related from the specified user

`/config toggle-ignore-user [@user]`

### Explicitly logs events that are related to the specified user, ignoring if it's ignored in the global configuration

`/config toggle-watch-user [@user]`

### Sets the template that will be used to log an event

`/config template [event] [field] [content]`

## Global configurations applied to all channels

### Shows the configurations applied to all the channels

`/global-config show`

### Ignores any event coming from the specified channel

`/global-config toggle-ignore-channel [#channel]`

### Ignores any event related from the specified user

`/global-config toggle-ignore-user [@user]`

### Sets the template that will be used to log an event

`/global-config template [event] [field] [content]`
