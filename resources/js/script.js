// 문서 로딩 완료 시 KRDSFormUtil 초기화
document.addEventListener("DOMContentLoaded", function () {
    KRDSFormUtil.init();
});

/**
 * KRDSFormUtil
 * 공통 폼 인터랙션 유틸리티 객체
 * - 인풋 삭제 버튼 기능
 * - 비밀번호 보기 토글 기능
 * - 퀵메뉴 인터랙션
 */
const KRDSFormUtil = {
    init() {
        this.bindInputClear();
        this.bindPasswordToggle();
        this.bindQuickMenuToggle();  // ✅ 퀵메뉴 토글 기능
    },

    bindInputClear() {
        document.querySelectorAll(".btn-delete-input").forEach(btn => {
            btn.addEventListener("click", function () {
                const input = this.closest(".btn-ico-wrap").querySelector("input");
                if (input) input.value = "";
            });
        });
    },

    bindPasswordToggle() {
        document.querySelectorAll(".btn-pw-visible").forEach(btn => {
            btn.addEventListener("click", function () {
                const icon = this.querySelector("i");
                const input = this.closest(".btn-ico-wrap").querySelector("input");

                if (!icon || !input) return;

                const isVisible = input.type === "text";
                input.type = isVisible ? "password" : "text";

                icon.classList.toggle("ico-pw-visible", isVisible);
                icon.classList.toggle("ico-pw-visible-on", !isVisible);
            });
        });
    },

    /**
     * [공통] 퀵메뉴 열기/닫기 토글 기능
     */
    bindQuickMenuToggle() {
        const toggleBtn = document.querySelector('.a_control');
        const quickWrap = document.querySelector('.quick-wrap-ul');
        const items = document.querySelectorAll('.quick-wrap-item');

        if (!toggleBtn || !quickWrap) return;

        let isOpen = false;

        toggleBtn.addEventListener('click', function () {
            isOpen = !isOpen;
            toggleBtn.classList.toggle('on', isOpen);
            quickWrap.classList.toggle('q-show', isOpen);

            if (isOpen) {
               [...items].reverse().forEach((item, i) => {
                    setTimeout(() => item.classList.add('q-show'), i * 100);
                });
            } else {
                items.forEach(item => item.classList.remove('q-show'));
            }
        });
    }
};
