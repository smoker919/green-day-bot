////////////////////////////////////////////////////////////////////////////////
// D A K O T A ' S   G R E E N   D A Y   B O T
// by Smoker919
// for Dakota_Ossa
//
// A custom bot to assist Dakota during her Green Appreciation Day show
////////////////////////////////////////////////////////////////////////////////


// Constants ///////////////////////////////////////////////////////////////////

const EXEC_USERS = ['dakota_ossa', 'smoker919'];

// colors
const DEFAULT_COLOR  = '#11443C';
const FAN_CLUB_GREEN = '#128816'; // 10% darker than CB's fan club green (#149718)
const MODERATOR_RED  = '#C30914'; // 10% darker than CB's moderator red (#D90A16)
const WHITE          = 'White';
const LIGHT_GREY     = '#E8E8E8';
const DARK_RED       = 'DarkRed';

// font weights
const NORMAL = 'normal';
const BOLD   = 'bold';

const MENU_ITEM_COUNT             = 50;
const SPIN_THE_WHEEL_PRIZE_COUNT  = 12;
const HIDDEN_SHOW_MENU_ITEM_COUNT = 15;

const NOTICES_FREQUENCY  = 4 * 60 * 1000;

const EMOJI_STAR  = '\u2B50';
const SYMBOL_STAR = '\u2605';
const STAR        = EMOJI_STAR;
    
const HELP_SEPARATOR = '\u2014'.repeat(24);
const HELP_NOTICE    = HELP_SEPARATOR + '\n\Type \'/menu\' to see the tip menu, complete with special ' + SYMBOL_STAR + 'Fan Club' + SYMBOL_STAR + ' :tinygreenfist-corrected3 prices\nType \'/wheel\' to see the special ' + SYMBOL_STAR + 'Fan Club' + SYMBOL_STAR + ' Spin the Wheel\nType \'/help\' to see this notice\n' + HELP_SEPARATOR;

const MENU_NOTICE_TITLE              = STAR + ' Dakota_Ossa\'s ' + STAR + ' GREEN APPRECIATION DAY ' + STAR + ' Tip Menu '             + STAR;
const WHEEL_NOTICE_TITLE             = STAR + ' Dakota_Ossa\'s ' + STAR + ' GREEN APPRECIATION DAY ' + STAR + ' Spin the Wheel '       + STAR;
const HIDDEN_SHOW_TITLE              = STAR + ' Dakota_Ossa\'s ' + STAR + ' GREEN APPRECIATION DAY ' + STAR + ' Hidden Show '          + STAR;
const HIDDEN_SHOW_MENU_NOTICE_TITLE  = STAR + ' Dakota_Ossa\'s ' + STAR + ' GREEN APPRECIATION DAY ' + STAR + ' Hidden Show Tip Menu ' + STAR;

//const FAN_CLUB_WELCOME_MESSAGE = 'Welcome back, %username%, my %adjective% fan club member!\n:dakota_ossa_17 \nI\'m so glad you could make it to my ' + STAR + 'GREEN APPRECIATION DAY' + STAR + ' so I can reward for you being part of my ' + STAR + 'GREEN FAMILY' + STAR + '\nCheck my profile for some goodies that are for my fans only on this special day!!';
const FAN_CLUB_WELCOME_MESSAGE = 'Welcome back, %username%, my %adjective% fan club member!\n:dakota_ossa_17 \nI\'m so glad you could make it to my ' + STAR + 'GREEN APPRECIATION DAY' + STAR + ' so I can reward for you being part of my ' + STAR + 'GREEN FAMILY' + STAR + '\nGoing forward, check my profile for goodies that will be only available for my fans!!';
const DEFAULT_WELCOME_MESSAGE  = 'Hi, %username%! I\'m Dakota, and welcome to my room!\n:dakota_ossa_17 \nToday is my ' + SYMBOL_STAR + 'GREEN APPRECIATION DAY' + SYMBOL_STAR + ' to reward my fan club members.\nJoin my fan club and become part of my ' + SYMBOL_STAR + 'GREEN FAMILY' + SYMBOL_STAR + ' to fully participate in today\'s special event!!';

const FOLLOW_THANK_YOU_MESSAGE = 'Thank you for following me ' + SYMBOL_STAR + '%username%' + SYMBOL_STAR + '\nI hope you enjoy my show and return often!!';

const FAN_CLUB_TIPPING_THANK_YOU_MESSAGE      = 'Thank you, my %adjective% fan club member ' + STAR + '%username%' + STAR + ' for showing your %tipping_action% by tipping\n:dakota_ossa_t05';
const ANON_FAN_CLUB_TIPPING_THANK_YOU_MESSAGE = 'Thank you ' + STAR + 'anonymous fan club member' + STAR + ' for showing your %tipping_action% by tipping\n:dakota_ossa_t05';
const DEFAULT_TIPPING_THANK_YOU_MESSAGE       = 'Thank you ' + SYMBOL_STAR + '%username%' + SYMBOL_STAR + ' for showing your %tipping_action% by tipping';
const ANON_DEFAULT_TIPPING_THANK_YOU_MESSAGE  = 'Thank you ' + SYMBOL_STAR + 'anonymous viewer' + SYMBOL_STAR + ' for showing your %tipping_action% by tipping';

const FAN_CLUB_TIPPED_FOR_MESSAGE      = 'Fan club member %username% tipped for '+ STAR + '%tipmenuitem_description%' + STAR;
const ANON_FAN_CLUB_TIPPED_FOR_MESSAGE = 'An anonymous fan club member tipped for ' + STAR + '%tipmenuitem_description%' + STAR;
const DEFAULT_TIPPED_FOR_MESSAGE       = '%username% tipped for ' + SYMBOL_STAR + '%tipmenuitem_description%' + SYMBOL_STAR;
const ANON_DEFAULT_TIPPED_FOR_MESSAGE  = 'An anonymous viewer tipped for ' + SYMBOL_STAR + '%tipmenuitem_description%' + SYMBOL_STAR;

const WHEEL_WINNER_MESSAGE      = 'Congratulations fan club member ' + STAR + '%winner%' + STAR + '\nYou won prize #%prize_number% ' + STAR + '%prize%' + STAR;
const ANON_WHEEL_WINNER_MESSAGE = 'Congratulations ' + STAR + 'anonymous fan club member' + STAR + '\nYou won prize #%prize_number% ' + STAR + '%prize%' + STAR;

const FAN_CLUB_ADJECTIVES = ['loyal', 'amazing', 'adored', 'loving', 'wonderful', 'incredible', 'awesome', 'beautiful', 'faithful', 'sexy', 'supportive'];

const TIPPING_ACTIONS = ['love', 'respect', 'support', 'encouragement', 'gratitude'];


// Class definitions ///////////////////////////////////////////////////////////

class TipMenuItem {
    constructor(description, price, fanClubPrice) {
        this.description  = description;
        this.price        = price;
        this.fanClubPrice = fanClubPrice;
    }
}


// Settings ////////////////////////////////////////////////////////////////////

// tip menu
cb.settings_choices = [
    {name: 'menu', type: 'choice', label: '(1) ~~~~~ Tip Menu ~~~~~~~~~~', required: false},
    {name: 'menu_style', type: 'choice', label: 'Style', choice1: 'Multi line', choice2: 'Single line', defaultValue: 'Multi line'},
];
for (var i = 1; i <= MENU_ITEM_COUNT; i++) {
    cb.settings_choices.push(
        {name: 'menu_item' + i + '_description', type: 'str', label: 'Item ' + i + ': ~~~~~ Description', defaultValue: '', required: false},
        {name: 'menu_item' + i + '_price', type: 'int', label: 'Price', minValue: 1, required: false},
        {name: 'menu_item' + i + '_fanClubPrice', type: 'int', label: 'Fan club price', minValue: 1, required: false},
    );
}

// spin the wheel
cb.settings_choices.push(
    {name: 'wheel', type: 'choice', label: '(2) ~~~~~ Spin the Wheel ~~~~~~~~~~', required: false},
    {name: 'wheel_pricePerSpin', type: 'int', label: 'Price per spin', minValue: 1, defaultValue: 1},
    {name: 'wheel_maxSpinsPerTip', type: 'int', label: 'Max spins per tip', minValue: 1, maxValue: 3, defaultValue: 1},
);
for (var i = 1; i <= SPIN_THE_WHEEL_PRIZE_COUNT; i++) {
    cb.settings_choices.push({name: 'wheel_prize' + i, type: 'str', label: 'Prize #' + i});
}

// hidden show tip menu
cb.settings_choices.push(
    {name: 'hiddenShowMenu', type: 'choice', label: '(3) ~~~~~ Hidden Show Tip Menu ~~~~~~~~~~', required: false},
    {name: 'hiddenShowMenu_style', type: 'choice', label: 'Style', choice1: 'Multi line', choice2: 'Single line', defaultValue: 'Multi line'},
);
for (var i = 1; i <= HIDDEN_SHOW_MENU_ITEM_COUNT; i++) {
    cb.settings_choices.push(
        {name: 'hiddenShowMenu_item' + i + '_description', type: 'str', label: 'Item ' + i + ': ~~~~~ Description', defaultValue: '', required: false},
        {name: 'hiddenShowMenu_item' + i + '_price', type: 'int', label: 'Price', minValue: 1, required: false},
        {name: 'hiddenShowMenu_item' + i + '_fanClubPrice', type: 'int', label: 'Fan club price', minValue: 1, required: false},
    );
}


// Variables ///////////////////////////////////////////////////////////////////

// tip menu
var menu_style;
var menu_items = [];
var menu_noticeText;

// spin the wheel
var wheel_isEnabled = true;
var wheel_pricePerSpin;
var wheel_maxSpinsPerTip;
var wheel_prizes = [];
var wheel_noticeText;
var wheel_spinTipAmounts = [];

// hidden show tip menu
var hiddenShowMenu_style;
var hiddenShowMenu_items = [];
var hiddenShowMenu_noticeText;


// Initialize the bot //////////////////////////////////////////////////////////

function init() {
    // tip menu
    menu_style = cb.settings.menu_style;
    menu_items = [];
    for (var i = 1; i <= MENU_ITEM_COUNT; i++) {
        menu_items.push(
            new TipMenuItem(
                String(cb.settings['menu_item' + i + '_description']),
                cb.settings['menu_item' + i + '_price'],
                cb.settings['menu_item' + i + '_fanClubPrice']
            )
        );
    }
    sortMenuItems(menu_items);
    menu_noticeText = generateMenuNoticeText(menu_style, menu_items);

    // spin the wheel
    wheel_pricePerSpin = cb.settings.wheel_pricePerSpin;
    wheel_maxSpinsPerTip = cb.settings.wheel_maxSpinsPerTip;
    for (var i = 1; i <= SPIN_THE_WHEEL_PRIZE_COUNT; i++) {
        wheel_prizes.push(cb.settings['wheel_prize' + i]);
    }

    var wheel_tipText;
    var wheel_winText;
    if (wheel_maxSpinsPerTip == 1) {
        wheel_tipText = wheel_pricePerSpin + ' ' + (wheel_pricePerSpin == 1 ? 'token' : 'tokens');
        wheel_winText = 'a prize:';
    } else if (wheel_maxSpinsPerTip == 2) {
        wheel_tipText = wheel_pricePerSpin + ' or ' + (wheel_pricePerSpin * 2) + ' tokens';
        wheel_winText = '1 or 2 prizes, respectively:';
    } else {
        wheel_tipText = wheel_pricePerSpin + ', ' + (wheel_pricePerSpin * 2) + ', or ' + (wheel_pricePerSpin * 3) + ' tokens';
        wheel_winText = '1, 2, or 3 prizes, respectively:';
    }
    wheel_noticeText = ':mediumwheel-ad2 \n' + STAR + ' FAN CLUB MEMBERS ' + STAR + ' can tip ' + wheel_tipText + ' to win ' + wheel_winText;
    wheel_prizes.forEach((value, index) => {
        wheel_noticeText += '\nPrize #' + (index + 1) + ' ' + STAR + ' ' + value;
    });

    for (var i = 1; i <= wheel_maxSpinsPerTip; i++) {
        wheel_spinTipAmounts.push(wheel_pricePerSpin * i);
    }

    // hidden show tip menu
    hiddenShowMenu_style = cb.settings.hiddenShowMenu_style;
    hiddenShowMenu_items = [];
    for (var i = 1; i <= HIDDEN_SHOW_MENU_ITEM_COUNT; i++) {
        hiddenShowMenu_items.push(
            new TipMenuItem(
                String(cb.settings['hiddenShowMenu_item' + i + '_description']),
                cb.settings['hiddenShowMenu_item' + i + '_price'],
                cb.settings['hiddenShowMenu_item' + i + '_fanClubPrice']
            )
        );
    }
    sortMenuItems(hiddenShowMenu_items);
    hiddenShowMenu_noticeText = generateMenuNoticeText(hiddenShowMenu_style, hiddenShowMenu_items);

    preloadFanClubData();

    scheduleAndsendMenuNotice();

    cb.setTimeout(scheduleAndSendWheelNotice, 10 * 1000); // offset by 10 seconds so the notifications aren't too close together

    cb.setTimeout(scheduleAndSendHelpNotices, NOTICES_FREQUENCY / 2);
}

function sortMenuItems(menuItems) {
    menuItems.sort((left, right) => {
        if (left.price && right.price) {
            return left.price - right.price;
        } else if (left.price) {
            return left.price - right.fanClubPrice;
        } else if (right.price) {
            return left.fanClubPrice - right.price;
        } else {
            return left.fanClubPrice - right.fanClubPrice;
        }
    });
}

function generateMenuNoticeText(menuStyle, menuItems) {
    var noticeText = '';
    const itemSeparator = (menuStyle == 'Single line') ? ' ' : '\n';
    menuItems.forEach(item => {
        if (item.description && item.description.indexOf('--') != 0 && (item.price || item.fanClubPrice)) {
            if (noticeText.length > 0) {
                noticeText += itemSeparator;
            }
            noticeText += STAR + ' ' + item.description + ' (';
            if (item.price) {
                noticeText += item.price;
                if (item.fanClubPrice) {
                    noticeText += ') (';
                }
            }
            if (item.fanClubPrice) {
                noticeText += item.fanClubPrice + ' :tinygreenfist-corrected3 ';
                if (!item.price) {
                    noticeText += 'only';
                }
            }
            noticeText += ')';
        }
    });    
    return noticeText;
}

function preloadFanClubData() {
    cb.getRoomUsersData(usersData => {
        if (usersData['success']) {
            usersData['data']['fanclub'].forEach(fanClubMember => {
                addFanClubMemberToHiddenShow(fanClubMember);
            });
            sendExecNotice('Initial fan club data successfully loaded');
        } else {
            sendExecNotice('Initial fan club data failed to load to load.  Retrying in 10 seconds...');
            // schedule to retry every 10 seconds until it's successful
            cb.setTimeout(preloadFanClubMembers, 10 * 1000);
        }
    });
}

function sendExecNotice(message) {
    EXEC_USERS.forEach(execUser => {
        cb.sendNotice('[Dakota\'s Green Day Bot] ' + message, execUser, LIGHT_GREY, DARK_RED, NORMAL);
    });
}

function scheduleAndsendMenuNotice() {
    scheduleNextMenuNotice();
    sendMenuNotice();
}

function scheduleNextMenuNotice() {
    cb.setTimeout(scheduleAndsendMenuNotice, NOTICES_FREQUENCY);
}

function sendMenuNotice() {
    sendMenuNoticeTo('');
}

function sendMenuNoticeTo(user) {
    if (cb.limitCam_isRunning()) {
        cb.sendNotice(HIDDEN_SHOW_MENU_NOTICE_TITLE, user, FAN_CLUB_GREEN, WHITE, BOLD);
        cb.sendNotice(hiddenShowMenu_noticeText, user, '', FAN_CLUB_GREEN, BOLD);
    } else {
        cb.sendNotice(MENU_NOTICE_TITLE, user, FAN_CLUB_GREEN, WHITE, BOLD);
        cb.sendNotice(menu_noticeText, user, '', FAN_CLUB_GREEN, BOLD);
    }
}

function scheduleAndSendWheelNotice() {
    scheduleNextWheelNotice();
    sendWheelNotice();
}

function scheduleNextWheelNotice() {
    cb.setTimeout(scheduleAndSendWheelNotice, NOTICES_FREQUENCY);
}

function sendWheelNotice() {
    sendWheelNoticeTo('');
}

function sendWheelNoticeTo(user) {
    if (!cb.limitCam_isRunning()) {
        cb.sendNotice(WHEEL_NOTICE_TITLE, user, FAN_CLUB_GREEN, WHITE, BOLD);
        cb.sendNotice(wheel_noticeText, user, '', FAN_CLUB_GREEN, BOLD);
    }
}

function scheduleAndSendHelpNotices() {
    scheduleNextHelpNotice();
    sendHelpNotice();
}

function scheduleNextHelpNotice() {
    cb.setTimeout(scheduleAndSendHelpNotices, NOTICES_FREQUENCY);
}

function sendHelpNotice() {
    sendHelpNoticeTo('');
}

function sendHelpNoticeTo(user) {
    cb.sendNotice(HELP_NOTICE, user, '', '', BOLD);
}

function addFanClubMemberToHiddenShow(user) {
    if (user['in_fanclub'] && !cb.limitCam_userHasAccess(user['user'])) {
        cb.limitCam_addUsers([user['user']]);
        cb.sendNotice('Fan club member ' + STAR + ' ' + capitalizeFirstLetters(user['user']) + ' ' + STAR + ' was added to ' + HIDDEN_SHOW_TITLE, '', FAN_CLUB_GREEN, WHITE, BOLD);
    }
}


// CB callback handlers ////////////////////////////////////////////////////////

var receivedWelcomeMessage = [];
var receivedFollowMessage =[];

function generateWelcomeMessage(user) {
    const isFanClubMember = user['in_fanclub'];
    var message = isFanClubMember ? FAN_CLUB_WELCOME_MESSAGE : DEFAULT_WELCOME_MESSAGE;
    if (message.indexOf('%username%') > -1) {
        message = message.replace('%username%', generateUsername(user['user']));
    }
    if (message.indexOf('%adjective%') > -1) {
        message = message.replace('%adjective%', generateRandomAdjective());
    }
    return message;
}

function onEnterHandler(user) {
    if (user['user'] != cb.room_slug) {
        // send welcome message
        if (!receivedWelcomeMessage.includes(user['user'])) {
            message = generateWelcomeMessage(user);
            cb.sendNotice(message, user['user'], user['in_fanclub'] ? FAN_CLUB_GREEN : DEFAULT_COLOR, WHITE, BOLD);
            receivedWelcomeMessage.push(user['user']);
        }
        addFanClubMemberToHiddenShow(user);
    }
}

function onFanclubJoinHandler(user) {
    addFanClubMemberToHiddenShow(user);
}

function onFollowHandler(user) {
    if (!receivedFollowMessage.includes(user['user'])) {
        var message = FOLLOW_THANK_YOU_MESSAGE;
        if (message.indexOf('%username%') > -1) {
            message = message.replace('%username%', generateUsername(user['user']));
        }
        cb.sendNotice(message, '', DEFAULT_COLOR, WHITE, BOLD);
        receivedFollowMessage.push(user['user']);
    }
}

function getMatchingTipMenuItems(menuItems, amount, isFanClubMember) {
    return menuItems.filter(menuItem => {
        return (isFanClubMember && amount == menuItem.fanClubPrice) || amount == menuItem.price;
    });
}

/**
 * Captializes the first character in the string if is a letter,
 * and then every letter following an underscore
 */
 function capitalizeFirstLetters(str) {
    var chars = str.split('');
    var capitalizeNext = true;
    for (var i = 0; i < str.length; i++) {
        if (capitalizeNext) {
            if (isLetter(chars[i])) {
                chars[i] = chars[i].toUpperCase();
            }
            capitalizeNext = false;
        }
        if (chars[i] == '_') {
            capitalizeNext = true;
        }
    }
    return chars.join('');
}

const IS_LETTER_REGEX = /[a-z]/

function isLetter(ch) {
    return IS_LETTER_REGEX.test(ch);
}

function generateUsername(username) {
    return capitalizeFirstLetters(username);
}

function generateRandomAdjective() {
    return FAN_CLUB_ADJECTIVES[Math.floor(Math.random() * FAN_CLUB_ADJECTIVES.length)];
}

function generateRandomTippingAction() {
    return TIPPING_ACTIONS[Math.floor(Math.random() * TIPPING_ACTIONS.length)];
}

function generateTipAmount(amount) {
    return amount == 1 ? '1 token' : amount + ' tokens';
}

function generateThankYouMessage(isFanClubMember, tip) {
    var message;
    if (isFanClubMember) {
        message = tip['is_anon_tip'] ? ANON_FAN_CLUB_TIPPING_THANK_YOU_MESSAGE : FAN_CLUB_TIPPING_THANK_YOU_MESSAGE;
    } else {
        message = tip['is_anon_tip'] ? ANON_DEFAULT_TIPPING_THANK_YOU_MESSAGE : DEFAULT_TIPPING_THANK_YOU_MESSAGE;
    }
    if (message.indexOf('%username%') > -1) {
        message = message.replace('%username%', generateUsername(tip['from_user']));
    }
    if (message.indexOf('%adjective%') > -1) {
        message = message.replace('%adjective%', generateRandomAdjective());
    }
    if (message.indexOf('%tipping_action%') > -1) {
        message = message.replace('%tipping_action%', generateRandomTippingAction());
    }
    return message;
}

function generateTippedForMessage(isFanClubMember, tip, menuItem) {
    var message;
    if (isFanClubMember) {
        message = tip['is_anon_tip'] ? ANON_FAN_CLUB_TIPPED_FOR_MESSAGE : FAN_CLUB_TIPPED_FOR_MESSAGE;
    } else {
        message = tip['is_anon_tip'] ? ANON_DEFAULT_TIPPED_FOR_MESSAGE : DEFAULT_TIPPED_FOR_MESSAGE;
    }
    if (message.indexOf('%username%') > -1) {
        message = message.replace('%username%', generateUsername(tip['from_user']));
    }
    if (message.indexOf('%tip_amount%') > -1) {
        message = message.replace('%tip_amount%', generateTipAmount(tip['amount']));
    }
    if (message.indexOf('%tipmenuitem_description%') > -1) {
        message = message.replace('%tipmenuitem_description%', menuItem.description);
    }
    return message;
}

function generateWheelWinnerMessage(winner, prizeNumber, prize) {
    var message = WHEEL_WINNER_MESSAGE;
    if (message.indexOf('%winner%') > -1) {
        message = message.replace('%winner%', winner);
    }
    if (message.indexOf('%prize_number%') > -1) {
        message = message.replace('%prize_number%', prizeNumber);
    }
    if (message.indexOf('%prize%') > -1) {
        message = message.replace('%prize%', prize);
    }
    return message;
}

function onTipHandler(tip) {
    const isFanClubMember = tip['from_user_in_fanclub'];
    const background = isFanClubMember ? FAN_CLUB_GREEN : DEFAULT_COLOR;

    // thank you message
    cb.sendNotice(generateThankYouMessage(isFanClubMember, tip), '', background, WHITE, BOLD);

    const limitCamIsRunning = cb.limitCam_isRunning();

    // tip menu
    const menuItems = limitCamIsRunning ? hiddenShowMenu_items : menu_items;
    var matches = getMatchingTipMenuItems(menuItems, tip['amount'], isFanClubMember)
    if (matches) {
        matches.forEach(menuItem => {
            cb.sendNotice(generateTippedForMessage(isFanClubMember, tip, menuItem), '', background, WHITE, BOLD);
        });
    }

    // spin the wheel
    if (!limitCamIsRunning && isFanClubMember) {
        var tipAmountIndex = wheel_spinTipAmounts.indexOf(tip['amount']);
        if (tipAmountIndex > -1) {
            var spins = tipAmountIndex + 1;
            var claimedPrizeIndexes = [];
            for (var i = 0; i < spins; i++) {
                var prizeIndex;
                do {
                    prizeIndex = Math.floor(Math.random() * wheel_prizes.length);
                } while (claimedPrizeIndexes.includes(prizeIndex));
                claimedPrizeIndexes.push(prizeIndex);
                var prizeNumber = prizeIndex + 1;
                var winner = generateUsername(tip['from_user']);
                cb.sendNotice(':smallwheelfixed' + prizeNumber, '', '', FAN_CLUB_GREEN, BOLD);
                var notice = generateWheelWinnerMessage(winner, prizeNumber, wheel_prizes[prizeIndex]);
                cb.sendNotice(notice, '', FAN_CLUB_GREEN, WHITE, BOLD);
            }
        }
    }
}

// for handling duplicate messages
var lastInputMessage = undefined;
var lastOutputMessage = undefined;
var lastMessageTime = new Date().getTime();
const duplicateMessageThreshold = 750;

function onMessageHandler(message) {
    var time = new Date().getTime();
    if (lastInputMessage && shallowEquals(lastInputMessage , message) && time < lastMessageTime + duplicateMessageThreshold) {
        // duplicate message detected; return last output message
        return lastOutputMessage;
    }
    lastInputMessage = {...message};
    lastMessageTime = time;

    message = handleMessage(message);

    lastOutputMessage = {...message};
    return message;
}

const TEST_REGEX = /^\/test \d+( (yes|no)( (yes|no))?)?$/; // <amount> <fan club> <anonymous>

const HIDDEN_SHOW_REGEX = /^(\/hs|\/hiddenshow) (start|stop|add( [a-z0-9_]+)+|remove( [a-z0-9_]+)+|list|status)$/;

const NOTICES_REGEX = /^(\/menu|\/wheel|\/help)( [a-z0-9_]+)?$/;

function handleMessage(message) {
    // testing in my room only
    if (cb.room_slug == 'smoker919') {
        // trigger the onTip handler to test the tip menu and spin the wheel
        if (TEST_REGEX.test(message['m'])) {
            var elements = message['m'].split(' ').slice(1);
            var amount = parseInt(elements[0]);
            var fanClub = elements.length == 1 || elements[1] == 'yes';
            var anonymous = elements.length == 3 && elements[2] == 'yes';
            onTipHandler({from_user: message['user'], amount: amount, is_anon_tip: anonymous, from_user_in_fanclub: fanClub});
        }
    }

    // hidden show
    if (EXEC_USERS.includes(message['user'])) {
        var originalMessage = message['m'];
        if (HIDDEN_SHOW_REGEX.test(originalMessage)) {
            var elements = originalMessage.split(' ').splice(1);
            var command = elements[0];
            var newMessage;
            if (command == 'start') {
                if (!cb.limitCam_isRunning()) {
                    cb.limitCam_start(HIDDEN_SHOW_TITLE);
                    cb.changeRoomSubject(HIDDEN_SHOW_TITLE + ' started');
                    newMessage = 'Hidden show started.';
                    // switch menus and disable spin the wheel
                    cb.sendNotice('The regular tip menu and Spin the Wheel will be disabled during the hidden show.\nA special, limited tip menu will be available instead.', '', MODERATOR_RED, WHITE, BOLD);
                    cb.setTimeout(sendMenuNotice, 5 * 1000); // offset by 5 seconds each so the notifications aren't too close together
                    cb.setTimeout(sendWheelNotice, 10 * 1000);
                } else {
                    newMessage = 'Error: Hidden show is already running.';
                }
            } else if (command == 'stop') {
                if (cb.limitCam_isRunning()) {
                    cb.limitCam_stop();
                    cb.changeRoomSubject('Hidden show finished')
                    newMessage = 'Hidden show stopped.';
                    // switch menus and re-enable spin the wheel
                    cb.sendNotice('Thank you to my wonderful fan club members for enjoying my special hidden show!!\nThe regular tip menu and Spin the Wheel have now been be re-enabled.\n:dakota_ossa_tiktok ', '', FAN_CLUB_GREEN, WHITE, BOLD);
                    cb.setTimeout(sendWheelNotice, 1000);
                    // TODO
                } else {
                    newMessage = 'Error: Hidden show is not running.';
                }
            } else if (command == 'add') {
                var usersToAdd = elements.slice(1);
                cb.limitCam_addUsers(usersToAdd);
                if (usersToAdd.length == 1) {
                    newMessage = usersToAdd + ' was added to the hidden show.';
                } else {
                    newMessage = '[' + usersToAdd + '] were added to the hidden show.';
                }
            } else if (command == 'remove') {
                var usersToRemove = elements.slice(1);
                cb.limitCam_removeUsers(usersToRemove);
                if (usersToRemove.length == 1) {
                    newMessage = usersToRemove + ' was removed from the hidden show.';
                } else {
                    newMessage = '[' + usersToRemove + '] were removed from the hidden show.';
                }
            } else if (command == 'list') {
                var users = cb.limitCam_allUsersWithAccess();
                if (users.length == 0) {
                    newMessage = 'No users have access to the hidden show.';
                } else if (users.length == 1) {
                    newMessage = 'One user has access to the hidden show: ' + users;
                } else {
                    newMessage = users.length + ' users have access to the hidden show: [' + users + ']';
                }
            } else { // command == 'status'
                newMessage = 'Hidden show is ' + (cb.limitCam_isRunning() ? 'running' : ' not running') + '.';
            }
            // modify the original message
            message['m'] += ' => (' + newMessage + ')';
            message['background'] = LIGHT_GREY;
            message['c'] = DARK_RED;
            message['X-Spam'] = true;
            // send to other exec user(s)
            notifyOtherExecUsers(message['user'], originalMessage, newMessage)
        }
    }

    if (NOTICES_REGEX.test(message['m'])) {
        var elements = message['m'].split(' ');
        var command = elements[0];
        if (command == '/menu') {
            if (message['is_mod'] || EXEC_USERS.includes(message['user'])) {
                if (elements.length == 2) {
                    var toUser = elements[1];
                    sendMenuNoticeTo(toUser);
                    message['m'] += ' => (Tip menu sent to ' + toUser + ')';
                } else {
                    sendMenuNotice();
                    message['m'] += ' => (Tip menu sent to all users)';
                }
            } else {
                sendMenuNoticeTo(message['user']);
                message['m'] += ' => (Tip menu sent to ' + message['user'] + ')';
            }
        } else if (command == '/wheel') {
            if (message['is_mod'] || EXEC_USERS.includes(message['user'])) {
                if (elements.length == 2) {
                    var toUser = elements[1];
                    sendWheelNoticeTo(toUser);
                    message['m'] += ' => (Spin the Wheel sent to ' + toUser + ')';
                } else {
                    sendWheelNotice();
                    message['m'] += ' => (Spin the Wheel sent to all users)';
                }
            } else {
                sendWheelNoticeTo(message['user']);
                message['m'] += ' => (Spin the Wheel sent to ' + message['user'] + ')';
            }
        } else { // command == '/help'
            if (message['is_mod'] || EXEC_USERS.includes(message['user'])) {
                if (elements.length == 2) {
                    var toUser = elements[1];
                    sendHelpNoticeTo(toUser);
                    message['m'] += ' => (Help notice sent to ' + toUser + ')';
                } else {
                    sendHelpNotice();
                    message['m'] += ' => (Help notice sent to all users)';
                }
            } else {
                sendHelpNoticeTo(message['user']);
                message['m'] += ' => (Help notice sent to ' + message['user'] + ')';
            }
        }
        message['background'] = LIGHT_GREY;
        message['c'] = DARK_RED;
        message['X-Spam'] = true;
    }

    // add fan club logo (small green fist)
    if (message['in_fanclub']) { // TODO: maybe exclude X-Spam messages
        message['m'] = ':dakota_ossa_smallgreenfist ' + message['m'];
    }

    return message;
}

function shallowEquals(obj1, obj2) {
    const entries1 = Object.entries(obj1);
    const entries2 = Object.entries(obj2);
    if (entries1.length !== entries2.length) {
        return false;
    }
    for (let i = 0; i < entries1.length; ++i) {
        // Keys
        if (entries1[i][0] !== entries2[i][0]) {
            return false;
        }
        // Values
        if (entries1[i][1] !== entries2[i][1]) {
            return false;
        }
    }
    return true;
}

function notifyOtherExecUsers(fromUser, originalMessage, newMessage) {
    EXEC_USERS.forEach(execUser => {
        if (execUser != fromUser) {
            cb.sendNotice(fromUser + ' executed: ' + originalMessage + '\nOutput: ' + newMessage, execUser, LIGHT_GREY, DARK_RED, NORMAL);
        }
    });
}


// CB callbacks ////////////////////////////////////////////////////////////////

cb.onEnter(onEnterHandler);

cb.onFanclubJoin(onFanclubJoinHandler);

cb.onFollow(onFollowHandler);

cb.onTip(onTipHandler);

cb.onMessage(onMessageHandler);


// Initialize the bot //////////////////////////////////////////////////////////

if (cb.room_slug == 'dakota_ossa' || cb.room_slug == 'smoker919') { // this bot works in my room for testing purposes
    init();
} else {
    cb.sendNotice('Sorry, but you aren\'t Dakota_Ossa so this bot will not work for you.');
}

