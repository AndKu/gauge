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

    this.setValue = function(value) {
    }

    this.draw();
}
