let bookmarkTree = [];
let selectedBookmarkId = null; 
const searchInput = document.getElementById('bookmarkSearch');
const toggleListBtn = document.getElementById('toggleListBtn');
const listContainer = document.getElementById('bookmarkList');
const nameInput = document.getElementById('nameInput');
const urlsInput = document.getElementById('urlsInput');
const msgEl = document.getElementById('message');

// ---------------- 1. 加载书签树 ----------------
function loadBookmarks() {
  chrome.bookmarks.getTree((tree) => {
    bookmarkTree = tree;
  });
}
loadBookmarks();

// ---------------- 2. 渲染逻辑（平铺 vs 树状） ----------------
// 搜索时平铺渲染
function renderFlatList(items) {
  listContainer.innerHTML = '';
  if (items.length === 0) {
    listContainer.innerHTML = '<div class="dropdown-item" style="color:#94a3b8; text-align:center;">未找到匹配的书签</div>';
    return;
  }

  items.slice(0, 100).forEach(item => {
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    div.textContent = item.title || '无标题';
    div.title = item.url; 
    div.addEventListener('mousedown', (e) => {
      e.preventDefault(); 
      selectBookmark(item);
    });
    listContainer.appendChild(div);
  });
}

// 树状递归渲染（支持折叠）
function renderTree(nodes, parentContainer, depth = 0) {
  for (const node of nodes) {
    if (node.children) {
      if (node.title) {
        // 有名字的节点是文件夹
        const folderWrap = document.createElement('div');
        
        const folderHeader = document.createElement('div');
        folderHeader.className = 'dropdown-folder';
        folderHeader.style.paddingLeft = `${8 + depth * 12}px`;
        
        const arrow = document.createElement('span');
        arrow.className = 'folder-icon';
        arrow.textContent = '▶';
        
        folderHeader.append(arrow, `📁 ${node.title}`);
        
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'folder-children hidden'; // 默认收起
        
        // 点击文件夹的折叠展开逻辑
        folderHeader.addEventListener('mousedown', (e) => {
          e.preventDefault(); 
          e.stopPropagation(); // 阻止触发外部点击关闭
          if (childrenContainer.classList.contains('hidden')) {
            childrenContainer.classList.remove('hidden');
            arrow.textContent = '▼';
          } else {
            childrenContainer.classList.add('hidden');
            arrow.textContent = '▶';
          }
        });
        
        folderWrap.appendChild(folderHeader);
        folderWrap.appendChild(childrenContainer);
        parentContainer.appendChild(folderWrap);
        
        // 递归渲染子项
        renderTree(node.children, childrenContainer, depth + 1);
      } else {
        // 根节点（没有标题），直接展开子项
        renderTree(node.children, parentContainer, depth);
      }
    } else if (node.url) {
      // 书签节点
      const div = document.createElement('div');
      div.className = 'dropdown-item';
      div.style.paddingLeft = `${8 + depth * 12}px`;
      div.textContent = node.title || '无标题';
      div.title = node.url; 
      div.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        selectBookmark(node);
      });
      parentContainer.appendChild(div);
    }
  }
}

// ---------------- 3. 交互事件控制 ----------------
// 点击箭头：切换展开/收起完整树
toggleListBtn.addEventListener('click', () => {
  if (listContainer.classList.contains('hidden')) {
    searchInput.value = ''; // 清空搜索以便看全部
    listContainer.innerHTML = '';
    renderTree(bookmarkTree, listContainer);
    listContainer.classList.remove('hidden');
    toggleListBtn.textContent = '▲';
  } else {
    listContainer.classList.add('hidden');
    toggleListBtn.textContent = '▼';
  }
});

// 搜索输入
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    if (listContainer.classList.contains('hidden')) return;
    // 清空搜索词时，恢复树状视图
    listContainer.innerHTML = '';
    renderTree(bookmarkTree, listContainer);
    return;
  }

  // 搜索时平铺
  const flatBookmarks = [];
  function collect(nodes) {
    for (const n of nodes) {
      if (n.url) flatBookmarks.push(n);
      if (n.children) collect(n.children);
    }
  }
  collect(bookmarkTree);

  const filtered = flatBookmarks.filter(bm => 
    bm.title.toLowerCase().includes(query) || bm.url.toLowerCase().includes(query)
  );

  renderFlatList(filtered);
});

// 点击输入框时自动展开
searchInput.addEventListener('focus', () => {
  if (listContainer.classList.contains('hidden')) {
    toggleListBtn.click();
  }
});

// 点击外部关闭
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !listContainer.contains(e.target) && e.target !== toggleListBtn) {
    listContainer.classList.add('hidden');
    toggleListBtn.textContent = '▼';
  }
});

// ---------------- 4. 选中并解析 ----------------
function selectBookmark(bm) {
  selectedBookmarkId = bm.id;
  searchInput.value = bm.title; 
  listContainer.classList.add('hidden');
  toggleListBtn.textContent = '▼';

  nameInput.value = bm.title.replace(/^▶\s*/, ''); 

  if (bm.url.startsWith('javascript:')) {
    try {
      const rawCode = decodeURIComponent(bm.url.substring(11));
      const match = rawCode.match(/var urls=(\[.*?\]);/);
      if (match && match[1]) {
        const urlsArray = JSON.parse(match[1]);
        const formattedUrls = urlsArray.map(u => {
          return /^https?:\/\//i.test(u) ? u : 'https://' + u;
        });
        urlsInput.value = formattedUrls.join('\n');
      } else {
        urlsInput.value = bm.url;
      }
    } catch (e) {
      urlsInput.value = bm.url;
    }
  } else {
    urlsInput.value = bm.url;
  }
  
  msgEl.textContent = '已读取书签内容，修改后点击下方按钮保存即可覆盖。';
  msgEl.className = 'message success';
}

// ---------------- 5. 保存/覆盖 ----------------
document.getElementById('generateBtn').addEventListener('click', () => {
  const name = nameInput.value.trim();
  const rawUrls = urlsInput.value;
  const useDelay = document.getElementById('delayInput').checked;
  const delayValue = parseInt(document.getElementById('delayTimeInput').value, 10) || 500;
  const useShorten = document.getElementById('shortenInput').checked;
  const usePrefix = document.getElementById('prefixToggle').checked;
  const prefixText = document.getElementById('prefixInput').value;

  msgEl.className = 'message';
  msgEl.textContent = '';

  if (!name) {
    showMsg('请填写书签名称', true);
    return;
  }

  let urls = rawUrls.split(/\r?\n/)
    .map(u => u.trim())
    .filter(u => u.length > 0)
    .map(u => {
      let finalUrl = u;
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = 'https://' + finalUrl;
      }
      return finalUrl;
    });

  urls = [...new Set(urls)];

  if (urls.length === 0) {
    showMsg('请至少填写一个有效的网址', true);
    return;
  }

  if (useShorten) {
    urls = urls.map(u => {
      let s = u.replace(/^https?:\/\//i, ''); 
      s = s.replace(/^www\./i, '');           
      s = s.replace(/\/$/, '');               
      return s;
    });
  }

  const protocolPrefix = useShorten ? 'https://' : '';
  const urlsJson = JSON.stringify(urls);

  let rawJsCode = '';
  if (useDelay) {
    rawJsCode = `(function(){var urls=${urlsJson};urls.forEach(function(u,i){setTimeout(function(){window.open('${protocolPrefix}'+u,'_blank');},i*${delayValue});});})();`;
  } else {
    rawJsCode = `(function(){var urls=${urlsJson};urls.forEach(function(u){window.open('${protocolPrefix}'+u,'_blank');});})();`;
  }

  const encodedJsCode = encodeURIComponent(rawJsCode);
  const finalBookmarkUrl = `javascript:${encodedJsCode}`;
  const finalTitle = usePrefix ? (prefixText + name) : name;

  if (selectedBookmarkId) {
    chrome.bookmarks.update(selectedBookmarkId, {
      title: finalTitle,
      url: finalBookmarkUrl
    }, (node) => {
      if (chrome.runtime.lastError) {
        showMsg('❌ 覆盖失败：' + chrome.runtime.lastError.message, true);
      } else {
        showMsg('✅ 成功！已覆盖原书签。', false);
        setTimeout(() => window.close(), 800);
      }
    });
  } else {
    chrome.bookmarks.create({
      parentId: '1', 
      title: finalTitle, 
      url: finalBookmarkUrl
    }, (node) => {
      if (chrome.runtime.lastError) {
        showMsg('❌ 添加失败：' + chrome.runtime.lastError.message, true);
      } else {
        showMsg('✅ 成功！已添加到书签栏。', false);
        setTimeout(() => window.close(), 800);
      }
    });
  }

  function showMsg(text, isError) {
    msgEl.textContent = text;
    msgEl.className = 'message ' + (isError ? 'error' : 'success');
  }
});