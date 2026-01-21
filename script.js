// === 이미지 확대 모달 (Lightbox) 스크립트 ===
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

// 모든 프로젝트 이미지에 클릭 이벤트 추가
// DOMContentLoaded: HTML이 완전히 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.project-img');
    
    if (images.length > 0) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                if(modal && modalImg) {
                    modal.style.display = "flex";
                    // 약간의 딜레이를 주어 애니메이션 효과 적용
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
            }, 300); // transition 시간과 맞춤
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