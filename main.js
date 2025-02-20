
/* 
* Author: Animatak_
* Released: 31/01/2025
* Updated: ??
*/

import { using } from './ModClasses.js';
import { translate } from './translater.js';

using('Terraria');
using('Terraria.UI');
using('Terraria.Chat');
using('Terraria.Map');
using('Terraria.DataStructures');
using('Microsoft.Xna.Framework');
using('Microsoft.Xna.Framework.Graphics');

const nVector2 = Vector2.new()['void .ctor(float x, float y)'];

function MouseText(cursorText, rare) {
	return Main.instance[
		'void MouseText(string cursorText, int rare, byte diff, int hackedMouseX, int hackedMouseY, int hackedScreenWidth, int hackedScreenHeight, int pushWidthX)'
	](cursorText, rare, 0, -1, -1, -1, -1, 0);
}

function pTeleport(position) {
	Main.mapFullscreen = false;
	return Player.Teleport(Main.LocalPlayer, nVector2(position.X * 16, position.Y * 16), 0, 0);
}

let worldTeleport = null;
let deathTeleport = null;
let worldData = null;

const baseDir = `./worldData`;

function getWorldFile() {
	return `${baseDir}/${Main.worldName}.json`;
}

function createDir(path) {
	if (!tl.directory.exists(path)) {
		tl.directory.create(path);
	}
}

function createWorldData() {
	createDir(baseDir);

	const worldFile = getWorldFile();

	if (!tl.file.exists(worldFile)) {
		const defaultData = {
			teleportPoints: [],
			deathTeleport: null
		};
		saveWorldData(defaultData);
	}
}

function loadWorldData() {
	const worldFile = getWorldFile();

	if (!tl.file.exists(worldFile)) {
		return { teleportPoints: [], deathTeleport: null };
	}
	const json = tl.file.read(worldFile);
	return JSON.parse(json);
}

function saveWorldData(data) {
	const worldFile = getWorldFile();
	const json = JSON.stringify(data, null, 2);
	tl.file.write(worldFile, json);
}

Main.Initialize_AlmostEverything.hook((original, self) => {
    original(self);
    worldTeleport = tl.texture.load("Textures/WorldTeleport.png");
    deathTeleport = tl.texture.load("Textures/DeathTeleport.png");
});

Player.Hooks.EnterWorld.hook((original, playerIndex) => {
	original(playerIndex);

	createWorldData();

	worldData = loadWorldData();
});

Player.KillMe.hook((original, self, damageSource, dmg, hitDirection, pvp) => {
	original(self, damageSource, dmg, hitDirection, pvp);

	if (self.whoAmI === Main.myPlayer && self.dead) {
		const deathPosition = { x: self.position.X / 16, y: self.position.Y / 16 };

		worldData.deathTeleport = deathPosition;
		saveWorldData(worldData);

		Main.NewText(translate.deathTpAdded(), 255, 0, 0);
	}
});

PingMapLayer.Draw.hook((original, self, context, text) => {
	const nContext = context["DrawResult Draw(Texture2D texture, Vector2 position, Alignment alignment)"];

	worldData.teleportPoints.forEach((Tp, index) => {
		const worldPosition = nVector2(Tp.x, Tp.y);
		const worldIcon = nContext(worldTeleport, worldPosition, Alignment.Center);

		if (worldIcon.IsMouseOver) {
			MouseText(`${translate.nameTp()} #${index + 1}`, 2);

			if (!Main.mouseLeft && Main.mouseLeftRelease) {
				pTeleport(worldPosition);
			}
		}
	});

	if (worldData.deathTeleport) {
		const deathPosition = nVector2(worldData.deathTeleport.x, worldData.deathTeleport.y);
		const deathIcon = nContext(deathTeleport, deathPosition, Alignment.Center);

		if (deathIcon.IsMouseOver) {
			MouseText(translate.deathTp(), 10);

			if (!Main.mouseLeft && Main.mouseLeftRelease) {
				pTeleport(deathPosition);

				worldData.deathTeleport = null;
				saveWorldData(worldData);

				Main.NewText(translate.deathTpRemoved(), 255, 0, 0);
			}
		}
	}

	original(self, context, text);
});

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);
	const command = message.Text.trim();
	const args = command.split(/ +/).slice(1);

	let mPlayer = Main.player[Main.myPlayer].position;

	if (command.startsWith('/tp')) {
		const Tp = { x: mPlayer.X / 16, y: mPlayer.Y / 16 };
		worldData.teleportPoints.push(Tp);
		saveWorldData(worldData);

		Main.NewText(translate.newTpAdded(), 50, 255, 130);
	}

	if (command.startsWith('/deltp')) {
		if (worldData.teleportPoints.length === 0) {
			Main.NewText(translate.dontHaveTps(), 255, 0, 0);
			return;
		}

		if (args.length == 0) {
			Main.NewText(translate.wrongUsage(), 255, 0, 0);
			return;
		}

		const index = parseInt(args[0]) - 1;

		if (isNaN(index) || index < 0 || index >= worldData.teleportPoints.length) {
			Main.NewText(translate.wrongTpNumber(), 255, 0, 0);
			return;
		}

		const removedTp = worldData.teleportPoints.splice(index, 1)[0];
		saveWorldData(worldData);

		Main.NewText(translate.removedTp(), 255, 100, 100);
	}

	if (command.startsWith('/clearall')) {
		if (worldData.teleportPoints.length === 0) {
			Main.NewText(translate.dontHaveTps(), 255, 0, 0);
			return;
		}

		worldData.teleportPoints = [];
		saveWorldData(worldData);

		Main.NewText(translate.removeAllTps(), 255, 100, 100);
	}
});
