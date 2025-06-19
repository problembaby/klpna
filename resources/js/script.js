// 문서 로딩 완료 시 KRDSFormUtil 초기화
document.addEventListener("DOMContentLoaded", function () {
    KRDSFormUtil.init();
});

/**
 * KRDSFormUtil
 * 공통 폼 인터랙션 유틸리티 객체
 */
const KRDSFormUtil = {
    init() {
        this.bindInputClear();
        this.bindPasswordToggle();
        this.bindQuickMenuToggle();
        this.bindGnbToggle(); // ✅ GNB 토글 기능
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
    },

    /**
     * [공통] GNB 열기/닫기 토글 기능
     */
    bindGnbToggle() {
        const triggers = document.querySelectorAll('.gnb-main-trigger');
        const depth2Menus = document.querySelectorAll('.depth2');
        const gnbBg = document.querySelector('.gnb-bg');
        const gnbBackdrop = document.querySelector('.gnb-backdrop');
        const body = document.body;

        function openGnb(trigger) {
            triggers.forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            depth2Menus.forEach(menu => menu.style.display = 'block');
            gnbBg.style.display = 'block';
            gnbBg.classList.add('active');
            gnbBackdrop?.classList.add('active');
            body.style.overflow = 'hidden';
        }

        function closeGnb() {
            triggers.forEach(t => t.classList.remove('active'));
            depth2Menus.forEach(menu => menu.style.display = 'none');
            gnbBg.style.display = 'none';
            gnbBg.classList.remove('active');
            gnbBackdrop?.classList.remove('active');
            body.style.overflow = '';
        }

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = gnbBg.classList.contains('active');
                const isThisActive = this.classList.contains('active');

                if (!isOpen) {
                    openGnb(this);
                } else if (isThisActive) {
                    closeGnb();
                } else {
                    triggers.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('#gnb')) {
                closeGnb();
            }
        });
    }
};
