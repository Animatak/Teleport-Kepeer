const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');

const translations = {
    Portuguese: {
        wrongTpNumber: "O Número do Teleporte é Inválido!",
        wrongUsage: "Info: /deltp + (Número do Teleporte)",
        newTpAdded: "Um novo Teleporte foi adicionado!",
        removedTp: "Teleporte removido!",
        removeAllTps: "Todos os Teleportes foram removidos!",
        dontHaveTps: "Não existem Teleportes salvos no momento...",
        nameTp: "Teleporte",
        deathTpAdded: "Ponto de Teleporte da Morte criado!",
        deathTpRemoved: "Ponto de Teleporte da Morte removido!",
        deathTp: "Teleporte da Morte"
    },
    Spanish: {
        wrongTpNumber: "¡El número de teletransporte no es válido!",
        wrongUsage: "Info: /deltp + (Número del Teletransporte)",
        newTpAdded: "¡Se ha añadido un nuevo teletransporte!",
        removedTp: "¡Teletransporte eliminado!",
        removeAllTps: "¡Todos los teletransportes han sido eliminados!",
        dontHaveTps: "No hay teletransportes guardados en este momento...",
        nameTp: "Teletransporte",
        deathTpAdded: "¡Se ha creado un punto de Teletransporte de Muerte!",
        deathTpRemoved: "¡Se ha eliminado el Teletransporte de Muerte!",
        deathTp: "Teletransporte de Muerte"
    },
    Italian: {
        wrongTpNumber: "Il numero del teletrasporto non è valido!",
        wrongUsage: "Info: /deltp + (Numero del Teletrasporto)",
        newTpAdded: "È stato aggiunto un nuovo teletrasporto!",
        removedTp: "Teletrasporto rimosso!",
        removeAllTps: "Tutti i teletrasporti sono stati rimossi!",
        dontHaveTps: "Non ci sono teletrasporti salvati al momento...",
        nameTp: "Teletrasporto",
        deathTpAdded: "Punto di Teletrasporto di Morte creato!",
        deathTpRemoved: "Punto di Teletrasporto di Morte rimosso!",
        deathTp: "Teletrasporto di Morte"
    },
    French: {
        wrongTpNumber: "Le numéro du téléporteur est invalide !",
        wrongUsage: "Info : /deltp + (Numéro du Téléporteur)",
        newTpAdded: "Un nouveau téléporteur a été ajouté !",
        removedTp: "Téléporteur supprimé !",
        removeAllTps: "Tous les téléporteurs ont été supprimés !",
        dontHaveTps: "Aucun téléporteur n'est enregistré pour le moment...",
        nameTp: "Téléporteur",
        deathTpAdded: "Point de Téléporteur de Mort créé !",
        deathTpRemoved: "Point de Téléporteur de Mort supprimé !",
        deathTp: "Téléporteur de Mort"
    },
    German: {
        wrongTpNumber: "Die Teleportnummer ist ungültig!",
        wrongUsage: "Info: /deltp + (Nummer des Teleporters)",
        newTpAdded: "Ein neuer Teleporter wurde hinzugefügt!",
        removedTp: "Teleporter entfernt!",
        removeAllTps: "Alle Teleporter wurden entfernt!",
        dontHaveTps: "Es sind derzeit keine Teleporter gespeichert...",
        nameTp: "Teleporter",
        deathTpAdded: "Todes-Teleporterpunkt erstellt!",
        deathTpRemoved: "Todes-Teleporterpunkt entfernt!",
        deathTp: "Todes-Teleporter"
    },
    Russian: {
        wrongTpNumber: "Номер телепорта недействителен!",
        wrongUsage: "Инфо: /deltp + (Номер Телепорта)",
        newTpAdded: "Добавлен новый телепорт!",
        removedTp: "Телепорт удалён!",
        removeAllTps: "Все телепорты были удалены!",
        dontHaveTps: "На данный момент нет сохранённых телепортов...",
        nameTp: "Телепорт",
        deathTpAdded: "Точка телепорта смерти создана!",
        deathTpRemoved: "Точка телепорта смерти удалена!",
        deathTp: "Телепорт смерти"
    },
    Default: {
        wrongTpNumber: "Invalid teleport number!",
        wrongUsage: "Info: /deltp + (Teleport Number)",
        newTpAdded: "A new teleport has been added!",
        removedTp: "Teleport removed!",
        removeAllTps: "All teleports have been removed!",
        dontHaveTps: "No teleports saved at the moment...",
        nameTp: "Teleport",
        deathTpAdded: "Death Teleport Point created!",
        deathTpRemoved: "Death Teleport Point removed!",
        deathTp: "Death Teleport"
    }
};

function getCurrentCulture() {
    const cultures = GameCulture.CultureName;
    for (let cultureName in cultures) {
        if (GameCulture.FromCultureName(cultures[cultureName]).IsActive) {
            return cultureName;
        }
    }
    return 'Default';
}

const translate = {
    wrongTpNumber() {
        const culture = getCurrentCulture();
        return translations[culture]?.wrongTpNumber || translations.Default.wrongTpNumber;
    },
    wrongUsage() {
        const culture = getCurrentCulture();
        return translations[culture]?.wrongUsage || translations.Default.wrongUsage;
    },
    newTpAdded() {
        const culture = getCurrentCulture();
        return translations[culture]?.newTpAdded || translations.Default.newTpAdded;
    },
    removedTp() {
        const culture = getCurrentCulture();
        return translations[culture]?.removedTp || translations.Default.removedTp;
    },
    removeAllTps() {
        const culture = getCurrentCulture();
        return translations[culture]?.removeAllTps || translations.Default.removeAllTps;
    },
    dontHaveTps() {
        const culture = getCurrentCulture();
        return translations[culture]?.dontHaveTps || translations.Default.dontHaveTps;
    },
    nameTp() {
        const culture = getCurrentCulture();
        return translations[culture]?.nameTp || translations.Default.nameTp;
    },
    deathTpAdded() {
        const culture = getCurrentCulture();
        return translations[culture]?.deathTpAdded || translations.Default.deathTpAdded;
    },
    deathTpRemoved() {
        const culture = getCurrentCulture();
        return translations[culture]?.deathTpRemoved || translations.Default.deathTpRemoved;
    },
    deathTp() {
        const culture = getCurrentCulture();
        return translations[culture]?.deathTp || translations.Default.deathTp;
    }
};

export { translate };