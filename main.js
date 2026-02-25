class LotteryDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render(numbers) {
        const template = document.createElement('template');
        if (numbers) {
            template.innerHTML = `
                <style>
                    .lotto-numbers {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 10px;
                        margin-top: 20px;
                    }
                    .lotto-number {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: #f0f0f0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 20px;
                        font-weight: bold;
                        color: #333;
                    }
                </style>
                <div class="lotto-numbers">
                    ${numbers.map(number => `<div class="lotto-number">${number}</div>`).join('')}
                </div>
            `;
        } else {
            template.innerHTML = `
                <style>
                    .lotto-placeholder {
                        margin-top: 20px;
                        text-align: center;
                        color: #aaa;
                    }
                </style>
                <div class="lotto-placeholder">
                    Lotto numbers will be displayed here.
                </div>
            `;
        }

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('lottery-display', LotteryDisplay);

document.getElementById('generator-btn').addEventListener('click', () => {
    const lotteryDisplay = document.querySelector('lottery-display');
    lotteryDisplay.render(generateLottoNumbers());
});

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
}
