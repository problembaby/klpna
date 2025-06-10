// 문서 로딩 완료 시 KRDSFormUtil 초기화
document.addEventListener("DOMContentLoaded", function () {
    KRDSFormUtil.init();
});

/**
 * KRDSFormUtil
 * 공통 폼 인터랙션 유틸리티 객체
 * - 인풋 삭제 버튼 기능
 * - 비밀번호 보기 토글 기능
 */
const KRDSFormUtil = {
    /**
     * 초기화 함수: 전체 이벤트 바인딩 실행
     */
    init() {
        this.bindInputClear();       // 인풋 삭제 버튼 기능
        this.bindPasswordToggle();   // 비밀번호 보기 토글 기능
    },

    /**
     * [공통] input 삭제 버튼 기능
     * .btn-delete-input 버튼 클릭 시 같은 영역 내 input 값을 초기화함
     */
    bindInputClear() {
        document.querySelectorAll(".btn-delete-input").forEach(btn => {
            btn.addEventListener("click", function () {
                const input = this.closest(".btn-ico-wrap").querySelector("input");
                if (input) input.value = "";
            });
        });
    },

    /**
     * [공통] 비밀번호 보기 토글 기능
     * #btn-pw-visible 버튼 클릭 시 input의 type을 password ↔ text로 변경
     * 아이콘 클래스도 ico-pw-visible ↔ ico-pw-visible-on으로 전환
     */
    bindPasswordToggle() {
        document.querySelectorAll(".btn-pw-visible").forEach(btn => {
            btn.addEventListener("click", function () {
                const icon = this.querySelector("i");
                const input = this.closest(".btn-ico-wrap").querySelector("input");

                if (!icon || !input) return;

                const isVisible = input.type === "text";

                // type 변경
                input.type = isVisible ? "password" : "text";

                // 아이콘 클래스 전환
                icon.classList.toggle("ico-pw-visible", isVisible);
                icon.classList.toggle("ico-pw-visible-on", !isVisible);
            });
        });
    }
};
