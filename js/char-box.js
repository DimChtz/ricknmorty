window.customElements.define(
	"char-box",
	class extends HTMLElement {
		constructor() {
			super();

			var id = this.getAttribute("id"),
				image = this.getAttribute("image"),
				name = this.getAttribute("name"),
				status = this.getAttribute("status"),
				species = this.getAttribute("species"),
				statusClass = `char-box__status--${status.toLowerCase()}`;

			this.innerHTML = `
				<a href="#" class="char-box" data-id="${id}">
					<div class="char-box__avatar">
						<img src="${image}" alt="" />
					</div>
					<div class="char-box__content">
						<h4 class="char-box__name">${name}</h4>
						<div class="char-box__status ${statusClass}">
							${status} - ${species}
						</div>
					</div>
				</a>
			`;
		}
	}
);
