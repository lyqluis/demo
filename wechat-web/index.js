let chatlist = document.getElementById('chatlist'),
    officiallist = document.getElementById('officiallist'),
    friendlist = document.getElementById('friendlist'),
    chatTab = document.getElementById('chatTab'),
    officialTab = document.getElementById('officialTab'),
    friendTab = document.getElementById('friendTab');
let nav = [chatTab, officialTab, friendTab],
    navul = [chatlist, officiallist, friendlist];

//点击切换左侧导航栏 + 导航栏变绿
function changeTab(e) {
    e = event ? event : window.event;
    target = e.target || e.srcElement;
    target = target.tagName.toLowerCase() === 'i' ? target.parentNode : target;
    target = target.tagName.toLowerCase() === 'span' ? target.parentNode : target;

    // 导航栏变绿
    target.children[0].children[0].className = target.children[0].children[0].className.indexOf('_g') === -1 ? target.children[0].children[0].className + '_g' : target.children[0].children[0].className;
    nav.map(val => {
        if (val !== target) {
            val.children[0].children[0].className = val.children[0].children[0].className.indexOf('_g') !== -1 ? val.children[0].children[0].className.slice(0, -2) : val.children[0].children[0].className;
        }
    });
    // 切换导航栏
    navul.map((val, index) => {
        val.className = index === nav.indexOf(target) ? '' : 'noshow';
    });
}
//绑定切换导航栏
nav.map(val => {
    val.onclick = changeTab;
});

// avatar-menu
let avatarMenuFlag = false;
//创建men

function createAvatarMenu(e){
    e = event ? event : window.event;
    target = e.target || e.srcElement;

    let avatar = document.querySelector('.avatar');
    if(!avatarMenuFlag){
        let avatarMenu = document.createElement('ul');
        avatarMenu.className = 'avatar-menu-list';
        let menuarr = ['关闭桌面通知', '关闭声音', '意见反馈', '退出'];
        menuarr.map(val => {
            let i = document.createElement('i');
            i.className = 'icon';
            let span = document.createElement('span');
            span.innerHTML = val;
            let li = document.createElement('li');
            li.appendChild(i);
            li.appendChild(span);
            avatarMenu.appendChild(li);
        });
        avatar.appendChild(avatarMenu);
        avatarMenuFlag = !avatarMenuFlag;  
    }else{
        let avatarMenu = document.querySelector('.avatar-menu-list');
        avatar.removeChild(avatarMenu);
        avatarMenuFlag = !avatarMenuFlag;  
    }
}
let avatarMenuBtn = document.querySelector('.avatar-menu');
avatarMenuBtn.onclick = createAvatarMenu;