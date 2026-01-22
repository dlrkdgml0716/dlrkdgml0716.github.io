// === [1] 화면 전환 함수 (SPA 방식) ===
function showContent(id, element) {
    // 1. 모든 메뉴 active 제거
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 2. 현재 클릭한 메뉴 active 추가
    element.classList.add('active');

    // 3. 안내 메시지 숨기기 (필요 시)
    const placeholder = document.getElementById('placeholder-view');
    if (placeholder) placeholder.style.display = 'none';

    // 4. 모든 콘텐츠 숨기기
    document.querySelectorAll('.content-display').forEach(content => {
        content.classList.remove('active');
    });
    
    // 5. 선택된 콘텐츠만 보이기
    const targetContent = document.getElementById(id);
    if(targetContent) {
        targetContent.classList.add('active');
    }
    
    // 모바일 스크롤 처리
    if (window.innerWidth <= 1000 && targetContent) {
        targetContent.scrollIntoView({ behavior: 'smooth' });
    }
}

// === [2] 이미지 확대 모달 (Lightbox) 스크립트 ===
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

document.addEventListener('DOMContentLoaded', () => {
    // 모든 프로젝트 이미지에 클릭 이벤트 추가
    const images = document.querySelectorAll('.project-img');
    
    if (images.length > 0) {
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

    // 닫기 버튼 클릭 시
    if(closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        });
    }

    // 배경 클릭 시 닫기
    if(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        });
    }
});