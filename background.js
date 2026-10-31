chrome.action.onClicked.addListener(() => {
  chrome.windows.getAll({ populate: true }, (windows) => {
    let existingWindow = null;
    
    for (const win of windows) {
      if (win.type === 'popup' && win.tabs && win.tabs.length > 0) {
        const tab = win.tabs[0];
        if (tab.url && tab.url.includes('popup.html')) {
          existingWindow = win;
          break;
        }
      }
    }

    if (existingWindow) {
      // 如果已经打开，强制把它拉到最前面并高亮
      chrome.windows.update(existingWindow.id, { focused: true, drawAttention: true });
    } else {
      // 创建时直接强制获得焦点
      chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 400,
        height: 720,
        focused: true
      });
    }
  });
});