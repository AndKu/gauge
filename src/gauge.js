function Gauge(element, configs) {

    if(element.length) return;
    configs = configs || {};

    var defaultsConfigs = {
            aperture: 270,
            value: 0,
            marks: [0,1,2,3,4,5,6],
            countMinorSegments: 10,
            segments: [
                {
                    endPosition: 75,
                    color: 'gray'
                },
                {
                    endPosition: 85,
                    color: 'orange'
                },
                {
                    endPosition: 100,
                    color: 'red'
                }
            ],
            marksInside: false
        },
        self = this,
        newGauge = false;

    for (var def in defaultsConfigs) {
        if (typeof configs[def] === 'undefined') {
            configs[def] = defaultsConfigs[def];
        }
    }

    this.configs = configs;

    /**

    /**
     * Создать div с классом segmentClass
     *
     * @param  {string} segmentClass класс элемента
     * @return {object}              <div class="segmentClass"></div>
     */
    this._getDomElement = function(segmentClass) {
        var element = document.createElement("div");
        element.className = segmentClass;
        return element;
    }

     * Отрисовать gauge, сначала очистив содержимое элемента element
     * затем создется элемент newGauge,
     * после в него добавляются все элементы gauge
     * и отрисовывается newGauge в необходимый элемент element
     *
     * @return {Gauge}
     */
    this.draw = function() {
        while (element.lastChild){
            element.removeChild(element.lastChild);
        }

        self.newGauge = self._getDomElement("gauge");

        element.appendChild(this.newGauge);

        return self;
    }

    /**
     * Изменяет значение gauge
     *
     * @param {number} value Значение в процентах от апертуры
     */
    this.setValue = function(value) {
        value = value || 0;
        if(value < 0) {
            value = 0;
        } else if(value > 100){
            value = 100;
        } else {
            value = 0;
        }

        self.value = value;
    }

    this.draw();
}
