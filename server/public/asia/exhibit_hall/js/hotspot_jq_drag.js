
(()=>{
    window.onload = function () {
        var modal_overlay = document.querySelector(".modal-overlay");
        setHelperBar();
        jQuery(".map-wrap").each(function () {
            var model_name = jQuery(this)
                .attr("class")
                .replace("-map-wrap map-wrap", "")
                .replace("area-", "");
            var outer_circle = document.querySelector(
                `.area-${model_name}-map-wrap .outer-circle`
            );
            var tooltip_wrap = document.querySelector(`.tooltip-${model_name}`);
            var modal_exit = document.querySelector(
                `.modal-${model_name} .button-exit`
            );

            initModal(model_name);

            var $modal_list = jQuery(".modal-wrap");
            var $modal_left = jQuery(".modal-left-btn");
            var $modal_right = jQuery(".modal-right-btn");

            $modal_left.click(function () {
                var i = 0;
                for (i = 0; i < $modal_list.length; i++) {
                    if (
                        $modal_list[i].classList.value.indexOf(
                            "modal-wrap--active"
                        ) !== -1
                    ) {
                        break;
                    }
                }
                var prev_index = i - 1 < 0 ? $modal_list.length - 1 : i - 1;
                $modal_list[i].classList.remove("modal-wrap--active");
                openModal(`.${$modal_list[prev_index].classList[1]}`);
            });

            $modal_right.click(function () {
                var i = 0;
                for (i = 0; i < $modal_list.length; i++) {
                    if (
                        $modal_list[i].classList.value.indexOf(
                            "modal-wrap--active"
                        ) !== -1
                    ) {
                        break;
                    }
                }
                $modal_list[i].classList.remove("modal-wrap--active");
                openModal(
                    `.${$modal_list[(i + 1) % $modal_list.length].classList[1]}`
                );
            });

            outer_circle.addEventListener("mouseover", (event) =>
                outerActive(`.tooltip-${model_name} `)
            );
            outer_circle.addEventListener("click", (event) => {
                openModal(`.modal-${model_name} `);
            });
            tooltip_wrap.addEventListener("mouseover", (event) => {
                outerActive(`.tooltip-${model_name} `);
            });
            tooltip_wrap.addEventListener("mouseout", (event) => {
                outerInactive(`.tooltip-${model_name} `);
            });
            tooltip_wrap.addEventListener("click", (event) => {
                openModal(`.modal-${model_name} `);
            });
            modal_exit.addEventListener("mouseover", (event) => {
                modal_exit.classList.add("button-exit--active");
            });
            modal_exit.addEventListener("mouseout", (event) => {
                modal_exit.classList.remove("button-exit--active");
            });
            modal_exit.addEventListener("click", (event) => {
                closeModal(`.modal-${model_name} `);
            });
        });
        // mobile
        jQuery(".tooltip-mobile .tooltip-item-wrap").each(function () {
            let className = this.classList[1].replace("tooltip-", "").replace("-mobile", "");
            this.addEventListener("click", function () {
                openModal(`.modal-${className}`)
            });
        });


        modal_overlay.addEventListener("click", closeAllModals);

        function outerActive(parent) {
            document
                .querySelector(parent + ".outer-circle")
                .classList.add("outer-circle--active");
            document
                .querySelector(parent + ".inner-circle")
                .classList.add("inner-circle--active");
            document
                .querySelector(parent + " .cross-v")
                .classList.add("cross--active");
            document
                .querySelector(parent + " .cross-h")
                .classList.add("cross--active");
            document
                .querySelector(parent + ".zoom-1")
                .classList.add("zoom--active");
            document
                .querySelector(parent + ".zoom-2")
                .classList.add("zoom--active");
            document
                .querySelector(parent + ".zoom-3")
                .classList.add("zoom--active");
            document
                .querySelector(parent + ".zoom-4")
                .classList.add("zoom--active");
            document.querySelector(parent).classList.add("tooltip-wrap--active");
            document
                .querySelector(parent + ".tooltip-textbox")
                .classList.add("tooltip-textbox--active");
        }
        function outerInactive(parent) {
            document
                .querySelector(parent + ".outer-circle")
                .classList.remove("outer-circle--active");
            document
                .querySelector(parent + ".inner-circle")
                .classList.remove("inner-circle--active");
            document
                .querySelector(parent + " .cross-v")
                .classList.remove("cross--active");
            document
                .querySelector(parent + " .cross-h")
                .classList.remove("cross--active");
            document
                .querySelector(parent + ".zoom-1")
                .classList.remove("zoom--active");
            document
                .querySelector(parent + ".zoom-2")
                .classList.remove("zoom--active");
            document
                .querySelector(parent + ".zoom-3")
                .classList.remove("zoom--active");
            document
                .querySelector(parent + ".zoom-4")
                .classList.remove("zoom--active");
            document.querySelector(parent).classList.remove("tooltip-wrap--active");
            document
                .querySelector(parent + ".tooltip-textbox")
                .classList.remove("tooltip-textbox--active");
        }
        function openModal(parent) {
            document.querySelector(parent).classList.add("modal-wrap--active");
            modal_overlay.classList.add("modal-overlay--active");

            var imageLoaded = 0;
            var total_cnt = jQuery(`${parent} .modal-image-switch`).length;
            var lazy_images = jQuery(`${parent} .lazy`);

            if (lazy_images.length !== 0) {
                lazy_images.each(function () {
                    jQuery(this).attr("src", jQuery(this).data("src"));
                    jQuery(this).removeClass("lazy");
                });

                jQuery(`${parent} .modal-image-switch`).each(function () {
                    if (jQuery(this)[0].complete) {
                        if (jQuery(this).data("listener") == undefined) {
                            enableDrag(parent);
                        }
                        return false;
                    } else {
                        jQuery(this)[0].onload = function () {
                            imageLoaded++;
                            if (imageLoaded === total_cnt) {
                                if (jQuery(this).data("listener") == undefined) {
                                    enableDrag(parent);
                                }
                            }
                        };
                    }
                });
            }
        }
        function closeModal(parent) {
            document.querySelector(parent).classList.remove("modal-wrap--active");
            modal_overlay.classList.remove("modal-overlay--active");
        }
        function closeAllModals() {
            var modal_wrap = document.getElementsByClassName("modal-wrap");
            for (var i = 0; i < modal_wrap.length; i++) {
                modal_wrap[i].classList.remove("modal-wrap--active");
            }
            modal_overlay.classList.remove("modal-overlay--active");
        }

        function enableDrag(payload) {
            var _this = document.querySelector(payload); // payload: .modal-nxhivac

            var old_dragX = 0;
            var model_name = _this.classList[1].replace("modal-", "");
            var current_str = _this.querySelector(".image-active");
            current_str = current_str.src.substr(
                current_str.src.indexOf(model_name)
            );
            current_str = current_str.replace(".jpg", "");
            current_str = current_str.replace(`${model_name}_`, "");
            var current_img = current_str.replaceAll("0", "");
            var this_image_array = _this.querySelectorAll(".modal-image-switch");
            var last_index = this_image_array[this_image_array.length - 1].src
                .substr(-6)
                .replace(".jpg", "");
            var counter = 0;

            _this.addEventListener(
                "dragstart",
                function (e) {
                    var img = document.createElement("img");
                    img.src =
                        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                    e.dataTransfer.setDragImage(img, 0, 0);
                    e.dataTransfer.effectAllowed = "none";
                },
                false
            );
            _this.addEventListener(
                "dragover",
                function (e) {
                    var list = _this.getElementsByClassName("modal-image-switch");
                    e = e || window.event;
                    var dragX = e.pageX;
                    if (old_dragX < dragX) {
                        counter--;
                        if (counter === -3) {
                            list[current_img].classList.remove("image-active");
                            if (current_img == 0) {
                                current_img = last_index;
                            } else {
                                current_img--;
                            }
                            list[current_img].classList.add("image-active");
                            counter = 0;
                        }
                    } else if (old_dragX > dragX) {
                        counter++;
                        if (counter === 3) {
                            list[current_img].classList.remove("image-active");
                            current_img = (current_img + 1) % list.length;
                            list[current_img].classList.add("image-active");
                            counter = 0;
                        }
                    }
                    old_dragX = dragX;
                },
                false
            );
            _this.setAttribute("data-listener", true);
        }

        function initModal(model_name) {
            setProductSort(model_name);
            setMaxIndex();
            setMobileRoation();
        }

        function setProductSort(model_name) {
            if (jQuery(`.modal-${model_name} .product-sort`).text() === "") {
                var product_type = jQuery(`.modal-${model_name}`)[0].classList[2];
                if (product_type === "industrial") {
                    jQuery(`.modal-${model_name} .product-sort`).text(
                        "Park Industrial Products"
                    );
                } else if (product_type === "research") {
                    jQuery(`.modal-${model_name} .product-sort`).text(
                        "Park Research Products"
                    );
                } else if (product_type === "os") {
                    jQuery(`.modal-${model_name} .product-sort`).text(
                        "Park AFM Operating Software"
                    );
                } else {
                    jQuery(`.modal-${model_name} .product-sort`).text(
                        "Park Products"
                    );
                }
            }
        }

        function setHelperBar() {
            var cnt = jQuery(".modal-wrap").length;
            var $modal_list = jQuery(".modal-wrap");
            var i = 0;

            var $helper_bar = jQuery(`<ul class="helper-bar"></ul>`);
            var $helper_bar_active = jQuery(`<ul class="helper-bar active"></ul>`);

            $modal_list.each(function () {
                var $helper_wrap = jQuery(`.${this.classList[1]} .helper-bar-wrap`);
                for (var j = 0; j < cnt; j++) {
                    if (i === j) {
                        $helper_bar_active.clone().appendTo($helper_wrap);
                    } else {
                        $helper_bar.clone().appendTo($helper_wrap);
                    }
                }
                i++;
            });
        }

        function setMaxIndex() {
            var cnt = jQuery(".modal-wrap").length;
            var max_cnt = cnt < 10 ? `0${cnt}` : cnt;
            var $max_index = jQuery(".modal-max-index");
            $max_index.each(function () {
                jQuery(this).text(max_cnt);
            });
        }

        function setMobileRoation() {
            jQuery(".modal-wrap.3d").each((index, $this) => {
                $this.querySelector(".rotate-btn-wrap .fa-redo-alt").addEventListener("click", function (e) { setMobileRoationCW($this) });
                $this.querySelector(".rotate-btn-wrap .fa-undo-alt").addEventListener("click", function (e) { setMobileRoationCCW($this) });
            })
        };


        function setMobileRoationCW($parent) {
            let imageList = $parent.getElementsByClassName("modal-image-switch");
            const offset = imageList.length / 9;
            let imgSrc = jQuery("." + $parent.classList[1] + " .image-active").attr("src") + "";

            const indexOfActive =
                Number(imgSrc
                    .substr(imgSrc.indexOf(".jpg") - 3, 3)
                    .replaceAll("0", ""));
            let nextIdx = (indexOfActive + offset) % imageList.length;

            imageList[indexOfActive].classList.remove("image-active");
            imageList[nextIdx].classList.add("image-active");
        }
        function setMobileRoationCCW($parent) {
            let imageList = $parent.getElementsByClassName("modal-image-switch");
            const offset = imageList.length / 9;
            let imgSrc = jQuery("." + $parent.classList[1] + " .image-active").attr("src") + "";
            const indexOfActive =
                Number(imgSrc.substr(imgSrc
                    .indexOf(".jpg") - 3, 3)
                    .replaceAll("0", ""));

            let nextIdx = (indexOfActive - offset) < 0 ?
                (indexOfActive - offset + imageList.length)
                : indexOfActive - offset;

            imageList[indexOfActive].classList.remove("image-active");
            imageList[nextIdx].classList.add("image-active");
        }
    };
})();