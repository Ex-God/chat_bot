export const model = `
    <div class="bot">
        <div class="bot__body">
            <div class="bot__header">
                <img class="bot__photo" src="./images/photo.jpg">
                <div class="bot__name">
                    <h4 class="bot__title">Ефросий</h4>
                    <p class="bot__subtitle">виртуальный консультант</p>
                </div>
                <button class="bot__close"></button>
            </div>
            <div class="bot__messages"></div>
            <form class="bot__form">
                <input class="bot__text" placeholder="введите сообщение и нажмите enter"></input>
                <button class="bot__submit" type="submit">
                    <img class="bot__submit-img" src="./images/enter.png">
                </button>
            </form>
        </div>
        <button class="bot__btn">
            <img class="bot__btn-img" src="./images/icon.png"></img>
        </button>
    </div>
`