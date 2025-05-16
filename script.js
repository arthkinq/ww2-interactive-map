// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Элементы
    const eventsLayer = document.getElementById('events-layer');
    const linesSvg = document.getElementById('lines-svg');
    const worldMapImageWrapper = document.getElementById('world-map-image-wrapper');
    const tooltip = document.getElementById('tooltip');
    const eventInfoImage = document.getElementById('event-info-image');
    const eventInfoTitle = document.getElementById('event-info-title');
    const eventInfoDate = document.getElementById('event-info-date');
    const eventInfoDescription = document.getElementById('event-info-description');
    const resetMapBtn = document.getElementById('reset-map-btn');
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const currentDateDisplay = document.getElementById('current-date-display');

    // Состояние
    let activeMainEvent = null;
    let currentYear = WAR_START_YEAR;
    let currentMonth = WAR_START_MONTH;
    let activeDotElement = null;

    // Константы
    const COMPACT_MARKER_THRESHOLD_PX = 70;
    const POLAROID_DEFAULT_WIDTH = 80;
    const POLAROID_RELATED_WIDTH = 70;
    const POLAROID_DEFAULT_HEIGHT_APPROX = 95;
    const POLAROID_RELATED_HEIGHT_APPROX = 75;

    function initializeApp() {
        initializeDateSelectors();
        displayEventsForDate(currentYear, currentMonth);
        clearInfoPanel(true);
        resetMapBtn.addEventListener('click', handleResetMapClick);
    }

    function initializeDateSelectors() { /* ... (без изменений из предыдущего ответа) ... */ }
    function populateMonthSelector(year) { /* ... (без изменений из предыдущего ответа) ... */ }
    function handleYearChange() { /* ... (без изменений из предыдущего ответа) ... */ }
    function handleMonthChange() { /* ... (без изменений из предыдущего ответа) ... */ }
    function updateCurrentDateDisplay(year, month) { /* ... (без изменений из предыдущего ответа) ... */ }
    
    // Копипаста из прошлого ответа
    function initializeDateSelectors() {
        for (let y = WAR_START_YEAR; y <= WAR_END_YEAR; y++) {
            const option = document.createElement('option');
            option.value = y; option.textContent = y;
            yearSelect.appendChild(option);
        }
        yearSelect.value = currentYear;
        yearSelect.addEventListener('change', handleYearChange);

        populateMonthSelector(currentYear);
        monthSelect.value = currentMonth; 
        monthSelect.addEventListener('change', handleMonthChange);

        updateCurrentDateDisplay(currentYear, currentMonth);
    }

    function populateMonthSelector(year) {
        monthSelect.innerHTML = ''; 
        const startM = (year === WAR_START_YEAR) ? WAR_START_MONTH : 1;
        const endM = (year === WAR_END_YEAR) ? WAR_END_MONTH : 12;

        let isCurrentMonthValid = false;
        ww2Months.forEach(monthObj => {
            if (monthObj.value >= startM && monthObj.value <= endM) {
                const option = document.createElement('option');
                option.value = monthObj.value; option.textContent = monthObj.name;
                monthSelect.appendChild(option);
                if (parseInt(year) === currentYear && monthObj.value === currentMonth) { // Проверяем и год и месяц
                    isCurrentMonthValid = true;
                }
            }
        });

        if (isCurrentMonthValid) {
            monthSelect.value = currentMonth;
        } else {
            monthSelect.value = monthSelect.options[0] ? monthSelect.options[0].value : startM;
            // currentMonth обновится в onDateChange после вызова из handleYearChange
        }
    }

    function handleYearChange() {
        const newYear = parseInt(yearSelect.value);
        currentYear = newYear; 
        populateMonthSelector(currentYear); 
        currentMonth = parseInt(monthSelect.value); 
        onDateChange();
    }

    function handleMonthChange() {
        currentMonth = parseInt(monthSelect.value);
        onDateChange();
    }
    
    function onDateChange() {
        updateCurrentDateDisplay(currentYear, currentMonth);
        // Важно: Сначала сбрасываем активное состояние, потом рисуем новое
        resetActiveEventState(); // Сброс активной точки, линий
        displayEventsForDate(currentYear, currentMonth); // Перерисовка маркеров для новой даты
        clearInfoPanel(true);
        resetMapBtn.classList.add('hidden');
    }

     function updateCurrentDateDisplay(year, month) {
        const monthName = ww2Months.find(m => m.value === month)?.name || '';
        currentDateDisplay.textContent = `${monthName} ${year}`;
    }


    function resetActiveEventState() {
        if (activeDotElement) {
            activeDotElement.remove();
            activeDotElement = null;
        }
        linesSvg.innerHTML = '';
        activeMainEvent = null;

        // Убираем классы, связанные с активным состоянием или спец. отображением
        document.querySelectorAll('.event-marker').forEach(m => {
            m.classList.remove('polaroid-hidden', 'compact-dot-marker');
            // Класс 'hidden' для связанных будет управляться в displayEventsForDate / showRelated
        });
    }

    function handleResetMapClick() {
        clearInfoPanel(true);
        resetMapBtn.classList.add('hidden');
        resetActiveEventState(); // Сбрасываем активную точку и линии
        displayEventsForDate(currentYear, currentMonth); // Перерисовываем все маркеры для текущей даты
    }

    function displayEventsForDate(year, month) {
        // resetActiveEventState(); // Вынесено в onDateChange и handleResetMapClick для более явного контроля
        eventsLayer.innerHTML = ''; // Полная очистка слоя перед новой отрисовкой

        const mainEventsForDate = ww2Events.filter(e => e.type === "main" && e.year === year && e.month === month);
        const allRelatedEventDataFromDB = ww2Events.filter(e => e.type === "related");

        let mainMarkerElements = []; // Для компактификации только главных

        // 1. Создаем и добавляем ГЛАВНЫЕ маркеры
        mainEventsForDate.forEach(eventData => {
            const markerEl = createEventMarker(eventData);
            mainMarkerElements.push({ domElement: markerEl, eventData: eventData });
        });

        // 2. Создаем и добавляем ВСЕ СВЯЗАННЫЕ маркеры (изначально СКРЫТЫ)
        allRelatedEventDataFromDB.forEach(eventData => {
            const markerEl = createEventMarker(eventData);
            markerEl.classList.add('hidden');
        });
        
        // 3. Применяем компактификацию к созданным главным маркерам
        applyCompaction(mainMarkerElements, false); // false - не связанное событие
    }

    function createEventMarker(eventData) { /* ... (без изменений из предыдущего ответа) ... */ }
        // Копипаста из прошлого ответа
    function createEventMarker(eventData) {
        const marker = document.createElement('div');
        marker.classList.add('event-marker');
        if (eventData.type === "main") marker.classList.add('main-event');
        else marker.classList.add('related-event');
        marker.id = `marker-${eventData.id}`;
        marker.style.left = `${eventData.coords.x}%`;
        marker.style.top = `${eventData.coords.y}%`;

        const img = document.createElement('img');
        img.classList.add('event-marker-image');
        img.src = eventData.image || 'assets/event_images/placeholder_event.jpg';
        img.alt = eventData.title.substring(0, 20);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('event-marker-title');
        titleDiv.textContent = eventData.title;

        marker.appendChild(img);
        marker.appendChild(titleDiv);

        if (eventData.type === "main") {
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                handleMainEventClick(eventData, marker);
            });
        } else { // related-event
            marker.addEventListener('mouseenter', (e) => showTooltip(e, eventData.connectionText || eventData.description));
            marker.addEventListener('mouseleave', hideTooltip);
        }
        eventsLayer.appendChild(marker);
        return marker;
    }


    function applyCompaction(markerInfos, isRelatedContext) { // markerInfos: [{ domElement, eventData }]
        const mapWrapperRect = worldMapImageWrapper.getBoundingClientRect();
        if (mapWrapperRect.width === 0 || mapWrapperRect.height === 0) return;

        let markersToCompact = new Set();

        for (let i = 0; i < markerInfos.length; i++) {
            for (let j = i + 1; j < markerInfos.length; j++) {
                const marker1Info = markerInfos[i];
                const marker2Info = markerInfos[j];

                // Если это компактификация связанных, и один из них уже polaroid-hidden (например, стал главной точкой), не трогаем
                // Но для главных, если один стал polaroid-hidden (активным), его не надо компактифицировать с другими.
                if (marker1Info.domElement.classList.contains('polaroid-hidden') || 
                    marker2Info.domElement.classList.contains('polaroid-hidden')) {
                    continue;
                }

                const m1_x_px = (marker1Info.eventData.coords.x / 100) * mapWrapperRect.width;
                const m1_y_px = (marker1Info.eventData.coords.y / 100) * mapWrapperRect.height;
                const m2_x_px = (marker2Info.eventData.coords.x / 100) * mapWrapperRect.width;
                const m2_y_px = (marker2Info.eventData.coords.y / 100) * mapWrapperRect.height;

                const distance = Math.sqrt(Math.pow(m1_x_px - m2_x_px, 2) + Math.pow(m1_y_px - m2_y_px, 2));
                
                // Для связанных событий порог может быть чуть меньше, так как они изначально меньше
                const threshold = isRelatedContext ? COMPACT_MARKER_THRESHOLD_PX * 0.8 : COMPACT_MARKER_THRESHOLD_PX;

                if (distance < threshold) {
                    markersToCompact.add(marker1Info.domElement);
                    markersToCompact.add(marker2Info.domElement);
                }
            }
        }
        markersToCompact.forEach(el => {
            // Не применяем compact-dot-marker, если это элемент, который должен стать активной точкой
            if (!(activeMainEvent && el.id === `marker-${activeMainEvent.id}`)) {
                 el.classList.add('compact-dot-marker');
            }
        });
    }

    function handleMainEventClick(clickedEventData, clickedMarkerElement) {
        if (activeMainEvent && activeMainEvent.id === clickedEventData.id && activeDotElement) {
            return; 
        }
        
        resetActiveEventState(); // Сброс предыдущего активного

        activeMainEvent = clickedEventData;

        activeDotElement = document.createElement('div');
        activeDotElement.classList.add('active-event-dot');
        activeDotElement.id = `active-dot-${clickedEventData.id}`;
        activeDotElement.style.left = `${clickedEventData.coords.x}%`;
        activeDotElement.style.top = `${clickedEventData.coords.y}%`;
        eventsLayer.appendChild(activeDotElement);

        if (clickedMarkerElement) {
            clickedMarkerElement.classList.add('polaroid-hidden');
        }
        
        document.querySelectorAll('.event-marker.main-event').forEach(m => {
            if (m.id !== `marker-${clickedEventData.id}`) {
                m.classList.add('hidden');
            } else {
                // Убедимся, что сам кликнутый маркер (его полароидная форма) скрыт, но не удален
                m.classList.add('polaroid-hidden'); 
                m.classList.remove('hidden'); // Если вдруг был скрыт как обычный главный
            }
        });
        
        showRelatedForActiveEvent();
        showEventInfoInPanel(clickedEventData);
        resetMapBtn.classList.remove('hidden');
    }

    function showRelatedForActiveEvent() {
        if (!activeMainEvent || !activeMainEvent.relatedEventIds) return;

        let visibleRelatedMarkersInfo = [];

        activeMainEvent.relatedEventIds.forEach(relatedId => {
            const relatedEventData = ww2Events.find(ev => ev.id === relatedId);
            if (relatedEventData) {
                const relatedMarkerEl = document.getElementById(`marker-${relatedEventData.id}`);
                if (relatedMarkerEl) {
                    relatedMarkerEl.classList.remove('hidden', 'compact-dot-marker'); // Показываем и сбрасываем компактификацию
                    visibleRelatedMarkersInfo.push({ domElement: relatedMarkerEl, eventData: relatedEventData });
                    drawConnectionLine(activeMainEvent, relatedEventData);
                }
            }
        });
        // Применяем компактификацию к показанным связанным событиям
        applyCompaction(visibleRelatedMarkersInfo, true); // true - это связанные события
    }

    function showEventInfoInPanel(eventData) { /* ... (без изменений из предыдущего ответа) ... */ }
    function clearInfoPanel(showDefaultText = false) { /* ... (без изменений из предыдущего ответа) ... */ }
    function showTooltip(mouseEvent, text) { /* ... (без изменений из предыдущего ответа) ... */ }
    function hideTooltip() { /* ... (без изменений из предыдущего ответа) ... */ }
    function drawConnectionLine(startEventData, endEventData) { /* ... (без изменений из предыдущего ответа) ... */ }
        // Копипаста из прошлого ответа
    function showEventInfoInPanel(eventData) {
        eventInfoImage.src = eventData.image || 'assets/event_images/placeholder_event.jpg';
        eventInfoImage.alt = eventData.title;
        if (eventData.image && eventData.image !== 'assets/event_images/placeholder_event.jpg') {
            eventInfoImage.classList.remove('hidden');
        } else {
            eventInfoImage.classList.add('hidden');
        }
        eventInfoTitle.textContent = eventData.title;
        eventInfoDate.textContent = eventData.dateString || `${ww2Months.find(m=>m.value === eventData.month).name} ${eventData.year}`;
        eventInfoDescription.textContent = eventData.description;
    }

    function clearInfoPanel(showDefaultText = false) {
        eventInfoImage.classList.add('hidden');
        eventInfoImage.src = "";
        if (showDefaultText) {
            eventInfoTitle.textContent = "Выберите событие на карте или дату";
            eventInfoDate.textContent = "";
            eventInfoDescription.textContent = "";
        } else {
             eventInfoTitle.textContent = "";
             eventInfoDate.textContent = "";
             eventInfoDescription.textContent = "";
        }
    }

    function showTooltip(mouseEvent, text) {
        tooltip.innerHTML = text;
        tooltip.classList.remove('hidden');
        const mapAreaRect = document.getElementById('map-area').getBoundingClientRect();
        const offsetX = 15; const offsetY = 15;
        let x = mouseEvent.clientX - mapAreaRect.left + offsetX;
        let y = mouseEvent.clientY - mapAreaRect.top + offsetY;
        const tooltipCurrentRect = tooltip.getBoundingClientRect();
        if (x + tooltipCurrentRect.width > mapAreaRect.width) x = mouseEvent.clientX - mapAreaRect.left - tooltipCurrentRect.width - offsetX;
        if (y + tooltipCurrentRect.height > mapAreaRect.height) y = mouseEvent.clientY - mapAreaRect.top - tooltipCurrentRect.height - offsetY;
        if (x < 0) x = offsetX; if (y < 0) y = offsetY;
        tooltip.style.left = `${x}px`; tooltip.style.top = `${y}px`;
    }
    function hideTooltip() { tooltip.classList.add('hidden'); }
    
    function drawConnectionLine(startEventData, endEventData) {
        const mapWrapperRect = worldMapImageWrapper.getBoundingClientRect();
        if (mapWrapperRect.width === 0 || mapWrapperRect.height === 0) return;

        const startX = (startEventData.coords.x / 100) * mapWrapperRect.width;
        const startY = (startEventData.coords.y / 100) * mapWrapperRect.height;
        
        let endMarkerCenterXOffset = 0;
        let endMarkerCenterYOffset = 0;
        const endMarkerEl = document.getElementById(`marker-${endEventData.id}`);

        if (endMarkerEl && endMarkerEl.classList.contains('compact-dot-marker')) {
            // Координаты уже указывают на центр из-за transform: translate(-50%, -50%)
        } else { // Для Полароида
            const polaroidWidth = (endEventData.type === "related" ? POLAROID_RELATED_WIDTH : POLAROID_DEFAULT_WIDTH);
            const polaroidHeight = (endEventData.type === "related" ? POLAROID_RELATED_HEIGHT_APPROX : POLAROID_DEFAULT_HEIGHT_APPROX);
            endMarkerCenterXOffset = polaroidWidth / 2;
            endMarkerCenterYOffset = polaroidHeight / 2;
        }

        const endX = (endEventData.coords.x / 100) * mapWrapperRect.width + endMarkerCenterXOffset;
        const endY = (endEventData.coords.y / 100) * mapWrapperRect.height + endMarkerCenterYOffset;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.id = `line-${startEventData.id}-to-${endEventData.id}`;
        path.classList.add('event-line');

        const dx = endX - startX; const dy = endY - startY;
        const curvatureFactor = 0.15 + Math.random() * 0.1; 
        const ctrlX = startX + dx / 2 - dy * curvatureFactor * (Math.random() < 0.5 ? 1 : -1);
        const ctrlY = startY + dy / 2 + dx * curvatureFactor * (Math.random() < 0.5 ? 1 : -1);
        
        path.setAttribute('d', `M${startX},${startY} Q${ctrlX},${ctrlY} ${endX},${endY}`);
        linesSvg.appendChild(path);
        setTimeout(() => path.classList.add('visible'), 50);
    }


    initializeApp();
});