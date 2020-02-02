//=============================================================================
// STS_HotKeys.js
//=============================================================================

/*:
 * @plugindesc Add few hot key in your project
 * @author SongToSoft
 * 
 * @help
 * inventoryKey - Key code button which open inventor
 * settingsKey - Key button which open settings
 * statusKey - Key button which open status menu
 * saveKey - Key button which open save menu
 * loadKey - Key button which open load menu
 * quickSaveKey - Key button which save game in slot
 * quickSaveSlotNumber - Save Slot Number which will be use for quick save 
 *
 * @param inventoryKey
 * @text Inventory key
 * @desc Key code button which open inventor
 * @default i
 * @type text
 *
 * @param settingsKey
 * @text Settings key
 * @desc Key button which open settings
 * @default m
 * @type text
 * 
 * @param statusKey
 * @text Status key
 * @desc Key button which open status menu
 * @default s
 * @type text
 *
 * @param saveKey
 * @text Save menu key
 * @desc Key button which open save menu
 * @default p
 * @type text
 * 
 * @param loadKey
 * @text Inventory key
 * @desc Key button which open load menu
 * @default l
 * @type text
 *
 * @param quickSaveKey
 * @text Quick Save key
 * @desc Key button which save game in slot
 * @default q
 * @type text
 * 
 * @param quickSaveSlotNumber
 * @text Save Slot Number which will be use for quick save 
 * @desc Key button which save game in slot
 * @default 1
 * @type number
 *
*/

(function()
{
    var params = PluginManager.parameters('STS_HotKeys');

    var inventoryKey = params["inventoryKey"].toLowerCase();
    var settingsKey = params["settingsKey"].toLowerCase();
    var statusKey = params["statusKey"];
    var saveKey = params["saveKey"].toLowerCase();
    var loadKey = params["loadKey"].toLowerCase();
    var quickSaveKey = params["quickSaveKey"].toLowerCase();
    var quickSaveSlotNumber = Number(params["quickSaveSlotNumber"]);

    var bitmap = new Bitmap(100, 100);
    bitmap.fillAll('white');
    bitmap.key = "Game was saved";
    var sprite = new Sprite(bitmap);
    this._whiteSquare = sprite;

    function CheckHotKeys(event)
    {
        if (event.key == inventoryKey)
        {
            if (!(SceneManager._scene instanceof Scene_Item))
            {
                SceneManager.push(Scene_Item);
            }
        }
        else
        {
            if (event.key == settingsKey)
            {
                if (!(SceneManager._scene instanceof Scene_Options))
                {
                    SceneManager.push(Scene_Options);
                }
            }
            else
            {
                if (event.key == statusKey)
                {
                    if (!(SceneManager._scene instanceof Scene_Status))
                    {
                        SceneManager.push(Scene_Status);
                    }
                }
                else
                {
                    if (event.key == saveKey)
                    {
                        if (!(SceneManager._scene instanceof Scene_Save))
                        {
                            SceneManager.push(Scene_Save);
                        }
                    }
                    else
                    {
                        if (event.key == loadKey)
                        {
                            if (!(SceneManager._scene instanceof Scene_Load))
                            {
                                SceneManager.push(Scene_Load);
                            }
                        }
                        else
                        {
                            if (event.key == quickSaveKey)
                            {
                                if (DataManager.saveGame(quickSaveSlotNumber))
                                {
                                    console.log("Quick save success");
                                    // TODO: Make gui box with text, and remove it after 2 - 3 seconds
                                    //SceneManager._scene.addChild(sprite);
                                    //Game_Interpreter.prototype.wait(100000000000000000000n);
                                    //SceneManager._scene.removeChild(sprite);
                                }
                                else
                                {
                                    console.log("Quick save end with error");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    Input._onKeyDown = function(event) 
    {
        // Numlock
        if (event.keyCode === 144) 
        {    
            this.clear();
        }
        CheckHotKeys(event);
        if (this._shouldPreventDefault(event.keyCode)) 
        {
            event.preventDefault();
        }
        var buttonName = this.keyMapper[event.keyCode];
        if (ResourceHandler.exists() && buttonName === 'ok') 
        {
            ResourceHandler.retry();
        } 
        else if (buttonName) 
        {
            this._currentState[buttonName] = true;
        }
    };
})();
