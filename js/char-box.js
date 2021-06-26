window.customElements.define(
	"char-box",
	class extends HTMLElement {
		constructor() {
			super();

			this.innerHTML = `
				<a href="#" class="char-box" data-id="${this.getAttribute("id")}">
					<div class="char-box__avatar">
						<img src="${this.getAttribute("image")}" alt="" />
					</div>
					<div class="char-box__content">
						<h4 class="char-box__name">${this.getAttribute("name")}</h4>
						<div class="char-box__status char-box__status--alive">
							${this.getAttribute("status")} - ${this.getAttribute("species")}
						</div>
					</div>
				</a>
			`;
		}
	}
);
