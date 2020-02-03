//=============================================================================
// STS_CustomMenu.js
//=============================================================================

/*:
 * @plugindesc Change submenues which will be visible in menu
 * @author SongToSoft
 *
 * @help
 * isVisibleItem - Is Visible Item submenu or not
 * isVisibleSkill - Is Visible Skill submenu or not
 * isVisibleEquip - Is Visible Equip submenu or not
 * isVisibleStatus - Is Visible Status submenu or not
 * isVisibleFormation - Is Visible Formation submenu or not
 * isVisibleOptions - Is Visible Options submenu or not
 * isVisibleSave - Is Visible Save submenu or not
 * isVisibleGameEnd - Is Visible GameEnd submenu or not
 * 
 * @param isVisibleItem
 * @text Is Visible Item
 * @desc Is Visible Item submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleSkill
 * @text Is Visible Skill
 * @desc Is Visible Skill submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleEquip
 * @text Is Visible Equip
 * @desc Is Visible Equip submenu or not
 * @default true
 * @type boolean
 *  
 * @param isVisibleStatus
 * @text Is Visible Status
 * @desc Is Visible Status submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleFormation
 * @text Is Visible Formation
 * @desc Is Visible Formation submenu or not
 * @default false
 * @type boolean
 * 
 * @param isVisibleContinue
 * @text Is Visible Continue
 * @desc Is Visible Continue submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleOptions
 * @text Is Visible Options
 * @desc Is Visible Options submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleSave
 * @text Is Visible Save
 * @desc Is Visible Save submenu or not
 * @default true
 * @type boolean
 * 
 * @param isVisibleGameEnd
 * @text Is Visible GameEnd
 * @desc Is Visible GameEnd submenu or not
 * @default true
 * @type boolean
 * 
*/

(function()
{
    var params = PluginManager.parameters('STS_CustomMenu');
    
    isVisibleItem = params["isVisibleItem"].toUpperCase() == "TRUE" ? true : false;
    isVisibleSkill = params["isVisibleSkill"].toUpperCase() == "TRUE" ? true : false;
    isVisibleEquip = params["isVisibleEquip"].toUpperCase() == "TRUE" ? true : false;
    isVisibleStatus = params["isVisibleStatus"].toUpperCase() == "TRUE" ? true : false;
    isVisibleFormation = params["isVisibleFormation"].toUpperCase() == "TRUE" ? true : false;
    isVisibleContinue = params["isVisibleContinue"].toUpperCase() == "TRUE" ? true : false;
    isVisibleOptions = params["isVisibleOptions"].toUpperCase() == "TRUE" ? true : false;
    isVisibleSave = params["isVisibleSave"].toUpperCase() == "TRUE" ? true : false;
    isVisibleGameEnd = params["isVisibleGameEnd"].toUpperCase() == "TRUE" ? true : false;

    //Make method for set active Scene_Load
    Scene_Menu.prototype.commandContinue = function() 
    {
        this._commandWindow.close();
        SceneManager.push(Scene_Load);
    };

    //Add handler for 'continue' button
    Scene_Menu.prototype.createCommandWindow = function() 
    {
        this._commandWindow = new Window_MenuCommand(0, 0);
        this._commandWindow.setHandler('item',      this.commandItem.bind(this));
        this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._commandWindow.setHandler('save',      this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
        this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
        this.addWindow(this._commandWindow);
    };

    Window_MenuCommand.prototype.addMainCommands = function() 
    {
        var enabled = this.areMainCommandsEnabled();
        if (this.needsCommand('item')) 
        {
            if (isVisibleItem)
            {
                this.addCommand(TextManager.item, 'item', enabled);
            }
        }
        if (this.needsCommand('skill')) 
        {
            if (isVisibleSkill)
            {
                this.addCommand(TextManager.skill, 'skill', enabled);
            }
        }
        if (this.needsCommand('equip')) 
        {
            if (isVisibleEquip)
            {
                this.addCommand(TextManager.equip, 'equip', enabled);
            }
        }
        if (this.needsCommand('status')) 
        {
            if (isVisibleStatus)
            {
                this.addCommand(TextManager.status, 'status', enabled);
            }
        }
    };

    //Add button 'continue' in this method
    Window_MenuCommand.prototype.addOriginalCommands = function() 
    {
        if (this.needsCommand('continue')) 
        {
            this.addCommand(TextManager.continue_, 'continue', true);
        }
    };

    Window_MenuCommand.prototype.makeCommandList = function() 
    {
        this.addMainCommands();
        if (isVisibleFormation)
        {
            this.addFormationCommand();
        }
        if (isVisibleContinue)
        {
            this.addOriginalCommands();
        }
        if (isVisibleOptions)
        {
            this.addOptionsCommand();
        }
        if (isVisibleSave)
        {
            this.addSaveCommand();
        }
        if (isVisibleGameEnd)
        {
            this.addGameEndCommand();
        }
    };
})();
