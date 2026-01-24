// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 로딩: URL 해시(#)가 있으면 그 페이지, 없으면 'home' 로드
    const page = window.location.hash.replace('#', '') || 'aboutMe';
    loadPage(page);

    // 2. 모달 닫기 이벤트 설정 (최초 1회만 실행하면 됨)
    setupModalCloseEvents();
});

// === [Core] 페이지 로드 함수 (파일 분리 지원) ===
async function loadPage(pageName) {
    const container = document.getElementById('app-container');
    const viewPane = document.querySelector('.view-pane');

    // 1. 페이드 아웃 (기존 내용 흐리게)
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)'; 

    try {
        // 2. HTML 파일 Fetch (pages 폴더에서 가져오기)
        const response = await fetch(`pages/${pageName}.html`);
        
        if (!response.ok) {
            throw new Error(`Page not found: ${pageName}`);
        }
        
        const html = await response.text();

        // 3. 내용 교체 (CSS 애니메이션 시간에 맞춰 딜레이)
        setTimeout(() => {
            container.innerHTML = html;
            
            // 4. 스크롤 맨 위로 초기화 (중요)
            if(viewPane) viewPane.scrollTop = 0;
            
            // 5. 페이드 인 (새 내용 등장)
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            // 6. URL 해시(#) 업데이트 및 사이드바 활성화
            window.location.hash = pageName;
            updateSidebarUI(pageName); 

            // 7. ★중요★: 새로 불러온 HTML 안의 이미지들에 모달 클릭 이벤트 다시 연결
            attachModalEvents();

        }, 200);

    } catch (error) {
        console.error('Error loading page:', error);
        container.innerHTML = `
            <div style="padding: 100px 20px; text-align: center; color: #888;">
                <h2>⚠️ 페이지를 불러올 수 없습니다.</h2>
                <p>로컬 환경이라면 VS Code의 'Live Server'로 실행해주세요.</p>
            </div>
        `;
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }
}

// === 사이드바 메뉴 활성화 (기존 스타일 유지) ===
function updateSidebarUI(pageName) {
    const buttons = document.querySelectorAll('.nav-item');
    
    buttons.forEach(btn => btn.classList.remove('active'));

    // onclick 속성에 페이지 이름이 포함된 버튼 찾기
    const activeBtn = Array.from(buttons).find(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        return onclickAttr && onclickAttr.includes(`'${pageName}'`);
    });

    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// === 이미지 확대 모달 기능 ===

// 동적 이미지 클릭 이벤트 (페이지 로드될 때마다 실행됨)
function attachModalEvents() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    
    // .project-img 클래스를 가진 이미지들 찾기
    const images = document.querySelectorAll('.project-img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            if(modal && modalImg) {
                modal.style.display = "flex";
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                modalImg.src = this.src;
            }
        });
    });
}

// 모달 닫기 이벤트 (초기 설정)
function setupModalCloseEvents() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    const closeFunc = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeFunc);
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeFunc();
        });
    }
}