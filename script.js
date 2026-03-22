// 导航栏滚动效果
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const projectSubnav = document.querySelector('.project-subnav');
    const currentScrollY = window.scrollY;
    
    // 检测滚动方向
    if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    lastScrollY = currentScrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(28, 28, 30, 0.9)';
    } else {
        navbar.style.background = 'rgba(28, 28, 30, 0.8)';
    }
    
    // 所有页面滚动时控制主导航栏显示/隐藏
    if (currentScrollY > 200 && scrollDirection === 'down') {
        // 下滑且滚动超过200px时隐藏主导航栏
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
        // 如果有项目内导航栏，调整其位置
        if (projectSubnav) {
            projectSubnav.style.top = '0';
            projectSubnav.style.transition = 'top 0.3s ease';
        }
    } else if (scrollDirection === 'up') {
        // 上滑时显示主导航栏
        navbar.style.transform = 'translateY(0)';
        // 如果有项目内导航栏，恢复其位置
        if (projectSubnav) {
            projectSubnav.style.top = '60px';
        }
    }
});

// 项目卡片悬停效果
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 项目导航按钮状态
const prevProjectBtn = document.querySelector('.prev-project');
const nextProjectBtn = document.querySelector('.next-project');

if (prevProjectBtn) {
    prevProjectBtn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            alert('没有上一个项目');
        }
    });
}

if (nextProjectBtn) {
    nextProjectBtn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            alert('没有下一个项目');
        }
    });
}

// 项目页面导航按钮悬浮显示逻辑
const projectNav = document.querySelector('.project-nav');
const videoContainer = document.querySelector('.video-container');

if (projectNav && videoContainer) {
    window.addEventListener('scroll', function() {
        const videoBottom = videoContainer.getBoundingClientRect().bottom;
        
        // 当视频底部滚动到视口顶部以下时，显示导航按钮
        if (videoBottom < 0) {
            projectNav.classList.add('visible');
        } else {
            projectNav.classList.remove('visible');
        }
    });
}