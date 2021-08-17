const gridTemplate = `<div class="js-store-grid-cont t-store__grid-cont t-container t-store__grid-cont_mobile-grid custom-container"></div>`;

const separator = `<div class="t-clear t-store__grid-separator" style="margin-bottom:50px;"></div>`;

const getCard = (cardData) => {
    return `
        <div class="js-product t-store__card t-col t-col_4 t-align_left  t-item" data-product-inv="" data-product-lid="${cardData.uid}" data-product-uid="${cardData.uid}" data-product-gen-uid="${cardData.uid}" data-product-pack-label="lwh" data-product-pack-m="0" data-product-pack-x="0" data-product-pack-y="0" data-product-pack-z="0" data-product-url="${cardData.link}" data-product-img="${cardData.img}">
            <div class="t-store__card__wrap_all " style="border-radius:5px;">
                <a href="${cardData.link}" target="_blank" rel="noopener">
                    <div class="t-store__card__imgwrapper " style="padding-bottom:97.22222222222223%;">
                        <div class="js-product-img t-store__card__bgimg t-bgimg loaded" data-original="${cardData.img}" style="background-image: url(${cardData.img}); border-radius: 5px 5px 0px 0px; top: -2px;" bgimgfield="st_gallery__379160738011:::0" src=""></div>
                    </div>
                </a>
                <div class="t-store__card__wrap_txt-and-btns" style="height: 178px;">
                    <div class="store__card__wrap_txt-and-opts">
                        <a href="${cardData.link}" target="_blank" rel="noopener">
                            <div class="t-store__card__textwrapper">
                                <div class="js-store-prod-name js-product-name t-store__card__title t-name t-name_md" style="color:#222424;font-weight:700;" field="st_title__379160738011" data-redactor-toolbar="no">${cardData.title}</div>
                                <div class="js-store-price-wrapper t-store__card__price-wrapper t-store__card__price-wrapper_below-title">
                                    <div class="t-store__card__price t-store__card__price-item t-name t-name_xs" style="font-size:23px;font-weight:400;">
                                        <div class="js-product-price js-store-prod-price-val t-store__card__price-value notranslate" translate="no" field="st_price__379160738011" data-redactor-toolbar="no" data-product-price-def="${cardData.price}" data-product-price-def-str="${cardData.priceStr}">${cardData.priceStr}</div>
                                        <div class="t-store__card__price-currency">р.</div>
                                    </div>
                                    <div class="t-store__card__price_old t-store__card__price-item t-name t-name_xs" style="display: none;font-size:23px;font-weight:400;">
                                        <div class="js-store-prod-price-old-val t-store__card__price-value notranslate" translate="no" field="st_priceold__379160738011" data-redactor-toolbar="no"></div>
                                        <div class="t-store__card__price-currency">р.</div>
                                    </div>
                                </div>
                                <div class="js-store-prod-descr t-store__card__descr t-descr t-descr_xxs" style="font-weight:400;" field="st_descr__379160738011" data-redactor-toolbar="no">
                                    ${cardData.rawDesc}
                                </div>
                            </div>
                        </a>
                        <div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </div>
    `
};