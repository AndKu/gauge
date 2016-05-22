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
     * Посчитать началный поворот от положения в процентах
     *
     * @param  {number} startSegmet начальное положение в процентах
     * @return {number}             значение поворота в deg
     */
    function calcStartRotate(start) {
        return (90 + self.configs.aperture / 2 + (360 - self.configs.aperture) + ((self.configs.aperture / 100) * start));
    }

    /**
     * Посчитать конец сегмента
     *
     * @param  {number} startSegmet начальная позиция сегмента в процентах
     * @param  {number} endSegment  конечная позиция сегмента в процентах
     * @return {number}             значение поворота блока конца сегмента
     */
    function calcSegmentEndRotate(startSegmet, endSegment) {
        var valSegmentEndRotate = self.configs.aperture / 100 * (endSegment - startSegmet) - 180;
        return valSegmentEndRotate > 0 ? 0 : valSegmentEndRotate;
    }

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

    /**
     * Получить dom сегмента
     *
     * @param  {number} startSegmet  начало сегмента в процентах от апертуры
     * @param  {number} endSegment   конец сегмента в процентах от апертуры
     * @param  {string} colorSegment Цвет сегмента
     * @return {object}              domElement c вычесленным поворотом блока
     */
    this._getSegment = function(startSegmet, endSegment, colorSegment) {
        if(startSegmet < 0 || startSegmet > 100 || !startSegmet) startSegmet = 0;
        if(endSegment < 0 || endSegment > 100 || !endSegment) endSegment = 100;

        var segment = self._getDomElement('gauge__segment-start');
        var segmentEnd = self._getDomElement('gauge__segment-end');
        var segmentColor = self._getDomElement('gauge__segment-color');

        segment.style.transform = 'rotate(' + calcStartRotate(startSegmet) + 'deg)';
        segmentEnd.style.transform = 'rotate(' + calcSegmentEndRotate(startSegmet, endSegment) + 'deg)';
        segmentColor.style.borderColor = colorSegment;

        segmentEnd.appendChild(segmentColor);
        segment.appendChild(segmentEnd);

        return segment;
    }

    /**
     * Отрисовать цветовые сегменты
     */
    this._drawSegments = function() {
        var newSegment = false;
        var segmentStart = 0;
        for (var i = 0; i < self.configs.segments.length; i++) {

            if (self.configs.segments[i-1]) {
                var segmentStart = self.configs.segments[i-1].endPosition;
            }

            newSegment = self._getSegment(
                segmentStart,
                self.configs.segments[i].endPosition,
                self.configs.segments[i].color
            );

            // if segment more then div of segment (delete white spaces)
            if ((self.configs.segments[i].endPosition - segmentStart) > 18000 / self.configs.aperture) {
                var segmentSpacer = self._getSegment(
                    self.configs.segments[i].endPosition - 18000 / self.configs.aperture,
                    self.configs.segments[i].endPosition,
                    self.configs.segments[i].color
                );
                self.newGauge.appendChild(segmentSpacer);
            }

            self.newGauge.appendChild(newSegment);
        }
    }

    /**
     * Отрисовка отметок
     */
    this._drawMarks = function() {
        for (var i = 0; i < self.configs.marks.length; i++) {
            self.newGauge.appendChild(self._getMark(i));
        }
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
        self._drawSegments();
        self._drawMarks();

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
