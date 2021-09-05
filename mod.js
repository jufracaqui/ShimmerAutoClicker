class SimmerAutoClicker {
    // called as soon as the mod is registered
    init() {
        Game.mods['shimmerAutoClicker'].generateSavedData();
        Game.registerHook('logic', this.shimmerAutoClicker);
    }

    // to store persistent data associated with the mod
    save() {
        return JSON.stringify({
            config: Game.mods['shimmerAutoClicker'].config,
            info: Game.mods['shimmerAutoClicker'].info,
        });
    }

    // do stuff with the string data you saved previously
    load(stringSave) {
        Game.mods['shimmerAutoClicker'].generateSavedData(stringSave);

        Game.mods['shimmerAutoClicker'].autoClicker();
    }

    initSaveData() {
        return {
            config: {
                autoClicker: 1,
                autoClickerInterval: 0,
                shimmerAutoClicker: 1,
            },
            info: {
                shimmersAutoClicked: {},
            },
        };
    }

    generateSavedData(stringSave) {
        // Default save data just in case
        const data = Game.mods['shimmerAutoClicker'].initSaveData();

        // In case there is saved data we write over the default data, just in case there are new configs in future updates
        if (stringSave) {
            const save = JSON.parse(stringSave);
            data.config = {
                ...data.config,
                ...save.config,
            };
            data.info = {
                ...data.info,
                ...save.info,
            };
        }

        Game.mods['shimmerAutoClicker'].config = data.config;
        Game.mods['shimmerAutoClicker'].info = data.info;
    }

    autoClicker() {
        if (Game.mods['shimmerAutoClicker'].config.autoClicker !== 1) {
            return;
        }
        
        const bigCookie = document.querySelector('#bigCookie');
        bigCookie.addEventListener('click', e => {
            if (Game.mods['shimmerAutoClicker'].config.autoClicker !== 1) {
                clearInterval(Game.mods['shimmerAutoClicker'].config.autoClickerInterval);
                Game.mods['shimmerAutoClicker'].config.autoClickerInterval = 0;
                return;
            }

            if (Game.mods['shimmerAutoClicker'].config.autoClickerInterval !== 0) {
                clearInterval(Game.mods['shimmerAutoClicker'].config.autoClickerInterval);
            }

            Game.mods['shimmerAutoClicker'].config.autoClickerInterval = setInterval(() => {
                    Game.ClickCookie(e);
            } , 0.001);
        });
        bigCookie.click();
    }

    shimmerAutoClicker() {
        if (Game.mods['shimmerAutoClicker'].config.shimmerAutoClicker !== 1) {
            return;
        }

        Game.shimmers.forEach(shimmer => {
            shimmer.l.click();

            if (Game.mods['shimmerAutoClicker'].info.shimmersAutoClicked[shimmer.type] === undefined) {
                Game.mods['shimmerAutoClicker'].info.shimmersAutoClicked[shimmer.type] = 1;
            } else {
                Game.mods['shimmerAutoClicker'].info.shimmersAutoClicked[shimmer.type] = Game.mods['shimmerAutoClicker'].info.shimmersAutoClicked[shimmer.type] + 1;
            }
        });
    }
}

Game.registerMod('shimmerAutoClicker', new SimmerAutoClicker());
