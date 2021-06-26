(function (window, document, $, undefined) {
	var endpoint = "https://rickandmortyapi.com/api/character";
	var $charsContainer = $("#chars-container");
	var $charsPagination = $(".chars-pagination");
	var $charPreviewModal = $("#char-preview-modal");

	function updateCharacters(_endpoint) {
		_endpoint = _endpoint || endpoint;
		fetch(_endpoint)
			.then((response) => response.json())
			.then((data) => {
				var characters = data.results;
				var info = data.info;
				if (characters) {
					$charsContainer.children().remove();
					for (c in characters) {
						$charsContainer.append(
							`<char-box
								id="${characters[c].id}"
								name="${characters[c].name}"
								status="${characters[c].status}"
								species="${characters[c].species}"
								image="${characters[c].image}">
							</char-box>`
						);
					}
				}
				if (info) {
					$charsPagination.each(function () {
						var $this = $(this);
						$this
							.find(".chars-pagination__nav--left")
							.attr("href", info.prev || "#");
						$this
							.find(".chars-pagination__nav--right")
							.attr("href", info.next || "#");
						$this.find(".total").text(info.pages);
					});
				}
			})
			.catch((error) => {
				console.error("Fetch failed: ", error);
			});
	}

	function showCharacter(id) {
		fetch(`${endpoint}/${id}`)
			.then((response) => response.json())
			.then((data) => {
				$charPreviewModal.addClass("is_active");
				$charPreviewModal.find(".char-modal__name").text(data.name);
				$charPreviewModal
					.find(".char-modal__avatar img")
					.attr("src", data.image);
				$charPreviewModal
					.find(".char-modal__status")
					.text(`${data.status} - ${data.species}`);

				var $details = $charPreviewModal.find(".char-modal__details");

				if (data.gender.toLowerCase() === "male") {
					$details
						.find(".gender span")
						.html('<i class="fas fa-mars gender-icon"></i> ' + data.gender);
				} else if (data.gender.toLowerCase() === "female") {
					$details
						.find(".gender span")
						.html('<i class="fas fa-venus gender-icon"></i> ' + data.gender);
				} else {
					$details.find(".gender span").html(data.gender);
				}

				$details.find(".location span").text(data.location.name);
				$details.find(".episodes span").text(data.episode.length);
			})
			.catch((error) => {
				console.error("Fetch failed: ", error);
			});
	}

	$(function () {
		updateCharacters();

		$charsContainer.on("click", ".char-box", function (e) {
			e.preventDefault();
			showCharacter($(this).data("id"));
		});

		$charsPagination.find(".chars-pagination__nav").on("click", function (e) {
			e.preventDefault();

			var amount = $(this).hasClass("chars-pagination__nav--left") ? -1 : 1;
			$charsPagination.each(function () {
				$(this)
					.find(".page")
					.text(parseInt($(this).find(".page").text()) + amount);

				$(this)
					.find(".chars-pagination__nav--left")
					.toggleClass(
						"chars-pagination__nav--disabled",
						parseInt($(this).find(".page").text()) < 2
					);

				$(this)
					.find(".chars-pagination__nav--right")
					.toggleClass(
						"chars-pagination__nav--disabled",
						parseInt($(this).find(".page").text()) >=
							parseInt($(this).find(".total").text())
					);
			});

			updateCharacters($(this).attr("href"));
		});

		$(".char-modal__close-btn").on("click", function (e) {
			e.preventDefault();
			$(this).parent().closest(".char-modal").removeClass("is_active");
		});

		$(".char-modal").on("click", function (e) {
			if (e.target == this) {
				$(this).removeClass("is_active");
			}
		});
	});
})(window, document, jQuery);
