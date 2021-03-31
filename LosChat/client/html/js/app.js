let chatOpened = false;
let buffer = [];
let currentBufferIndex = -1;
let timeout = null;
let messagesBlock = null;
let msgInputBlock = null;
let msgInputLine = null;

function colorify(text) {
    let matches = [];
    let m = null;
    let curPos = 0;

    if (!text) {
        return;
    }

    do {
        m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substr(curPos));

        if (!m) {
            break;
        }

        matches.push({
            found: m[0],
            index: m['index'] + curPos,
        });

        curPos = curPos + m['index'] + m[0].length;
    } while (m != null);

    if (matches.length > 0) {
        text += '</font>';

        for (let i = matches.length - 1; i >= 0; --i) {
            let color = matches[i].found.substring(1, matches[i].found.length - 1);
            let insertHtml = (i != 0 ? '</font>' : '') + '<font color="#' + color + '">';
            text =
                text.slice(0, matches[i].index) +
                insertHtml +
                text.slice(matches[i].index + matches[i].found.length, text.length);
        }
    }

    return text;
}

function openChat(insertSlash) {
    clearTimeout(timeout);

    if (!chatOpened) {
        if (insertSlash) {
            msgInputLine.value = '/';
        }

        msgInputBlock.style.display = 'block';
        msgInputBlock.style.opacity = 1;
        msgInputLine.focus();

        chatOpened = true;
    }
}

function closeChat() {
    if (chatOpened) {
        msgInputLine.blur();
        msgInputBlock.style.display = 'none';

        chatOpened = false;
    }
}

window.addEventListener('load', () => {
    messagesBlock = document.querySelector('.messages');
    msgInputBlock = document.querySelector('.msginput');
    msgInputLine = document.querySelector('.msginput input');

    document.querySelector('#message').addEventListener('submit', (e) => {
        e.preventDefault();

        alt.emit('chatmessage', msgInputLine.value);

        saveBuffer();
        closeChat();

        msgInputLine.value = '';
    });

    msgInputLine.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
        } else if (e.keyCode === 40) {
            e.preventDefault();

            if (currentBufferIndex > 0) {
                loadBuffer(--currentBufferIndex);
            } else if (currentBufferIndex === 0) {
                currentBufferIndex = -1;
                msgInputLine.value = '';
            }
        } else if (e.keyCode === 38) {
            e.preventDefault();

            if (currentBufferIndex < buffer.length - 1) {
                loadBuffer(++currentBufferIndex);
            }
        }
    });

    alt.emit('chatloaded');
});

function saveBuffer() {
    if (buffer.length > 100) {
        buffer.pop();
    }

    buffer.unshift(msgInputLine.value);
    currentBufferIndex = -1;
}

function loadBuffer(idx) {
    msgInputLine.value = buffer[idx];
}

alt.on('openChat', openChat);
alt.on('closeChat', closeChat);
