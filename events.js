// events.js
const ww2Events = [
    // --- СЕНТЯБРЬ 1939 ---
    {
        id: "german_invasion_poland_main", // Сделал ID более явным
        type: "main",
        title: "Вторжение Германии в Польшу",
        year: 1939, month: 9, dateString: "1 сентября 1939",
        description: "Немецкие войска пересекают польскую границу. Начинается Вторая мировая война в Европе. Применяется тактика 'Блицкрига'.",
        image: "assets/event_images/german_invasion_poland.jpg", // ЗАМЕНИТЕ
        coords: { x: 50, y: 40 }, // ПОДСТРОЙТЕ! (Центр Польши)
        relatedEventIds: ["slovak_joins_invasion", "bombing_warsaw_early", "uk_france_ultimatum"]
    },
    {
        id: "slovak_joins_invasion",
        type: "related",
        title: "Словакия присоединяется к вторжению",
        year: 1939, month: 9, dateString: "1 сентября 1939",
        description: "Словацкие войска также вторгаются в Польшу на стороне Германии.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 50.5, y: 42.5 }, // ПОДСТРОЙТЕ! (Юг Польши/Словакия)
        connectionText: "Словакия, как союзник Германии, участвовала во вторжении."
    },
    {
        id: "bombing_warsaw_early",
        type: "related",
        title: "Начало бомбардировок Варшавы",
        year: 1939, month: 9, dateString: "1 сентября 1939",
        description: "Люфтваффе начинает бомбардировки польской столицы, нанося удары по военным и гражданским объектам.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 50.8, y: 39.5 }, // ПОДСТРОЙТЕ! (Варшава)
        connectionText: "Вторжение сопровождалось немедленными воздушными ударами по ключевым городам."
    },
    {
        id: "uk_france_ultimatum",
        type: "main", // Сделаем главным, так как это ключевой дипломатический шаг
        title: "Ультиматум Германии от UK и Франции",
        year: 1939, month: 9, dateString: "1-2 сентября 1939",
        description: "Великобритания и Франция требуют от Германии немедленного вывода войск из Польши.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 0, y: 10 }, // ПОДСТРОЙТЕ! (Лондон/Париж)
        relatedEventIds: ["uk_france_declare_war_sep3"]
    },
    {
        id: "uk_france_declare_war_sep3", // Был uk_france_declare_war
        type: "related", // Связан с ультиматумом
        title: "UK и Франция объявляют войну Германии",
        year: 1939, month: 9, dateString: "3 сентября 1939",
        description: "После истечения срока ультиматума, Великобритания и Франция объявляют войну Германии.",
        image: "assets/event_images/uk_france_declaration.jpg", // ЗАМЕНИТЕ
        coords: { x: 45.5, y: 38.5 }, // ПОДСТРОЙТЕ!
        connectionText: "Германия проигнорировала ультиматум, что привело к объявлению войны."
    },
    {
        id: "battle_bzura_starts",
        type: "main",
        title: "Начало битвы на Бзуре",
        year: 1939, month: 9, dateString: "9 сентября 1939",
        description: "Польские армии 'Познань' и 'Поможе' предпринимают контрудар против наступающих немецких войск. Крупнейшее сражение кампании.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 49.5, y: 40.5 }, // ПОДСТРОЙТЕ! (Западнее Варшавы)
        relatedEventIds: []
    },
    {
        id: "soviet_invasion_poland_sep17", // Был soviet_invasion_poland
        type: "main",
        title: "Вторжение СССР в Польшу",
        year: 1939, month: 9, dateString: "17 сентября 1939",
        description: "Красная Армия входит в восточные районы Польши, реализуя секретные договоренности с Германией.",
        image: "assets/event_images/soviet_invasion_poland.jpg", // ЗАМЕНИТЕ
        coords: { x: 53, y: 41 }, // ПОДСТРОЙТЕ! (Восточная Польша)
        relatedEventIds: ["polish_gov_flees_romania"]
    },
    {
        id: "polish_gov_flees_romania",
        type: "related",
        title: "Польское правительство бежит в Румынию",
        year: 1939, month: 9, dateString: "17-18 сентября 1939",
        description: "Перед лицом двойной агрессии польское правительство и верховное командование эвакуируются в Румынию.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 52.5, y: 43 }, // ПОДСТРОЙТЕ! (Граница с Румынией)
        connectionText: "Вторжение СССР сделало положение Польши безнадежным, вынудив правительство к эвакуации."
    },
    {
        id: "warsaw_capitulates",
        type: "main",
        title: "Капитуляция Варшавы",
        year: 1939, month: 9, dateString: "28 сентября 1939",
        description: "После героической обороны и интенсивных бомбардировок Варшава капитулирует перед немецкими войсками.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 51, y: 39.8 }, // ПОДСТРОЙТЕ! (Варшава)
        relatedEventIds: []
    },
    {
        id: "molotov_ribbentrop_friendship_treaty",
        type: "main",
        title: "Договор о дружбе и границе",
        year: 1939, month: 9, dateString: "28 сентября 1939",
        description: "СССР и Германия подписывают договор, окончательно закрепляющий раздел Польши и другие сферы влияния.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 54, y: 38 }, // ПОДСТРОЙТЕ! (Москва)
        relatedEventIds: ["final_polish_partition_map"]
    },

    // ОКТЯБРЬ 1939
    {
        id: "battle_kock_ends_poland", // Был end_polish_campaign
        type: "main",
        title: "Последнее сражение в Польше (Коцк)",
        year: 1939, month: 10, dateString: "2-5 октября 1939",
        description: "Оперативная группа 'Полесье' генерала Клееберга ведет последние бои. Ее капитуляция означает конец организованного сопротивления в Польше.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 51.5, y: 40.8 }, // ПОДСТРОЙТЕ! (Район Коцка)
        relatedEventIds: ["final_polish_partition_map"]
    },
    {
        id: "final_polish_partition_map",
        type: "related",
        title: "Окончательный раздел Польши",
        year: 1939, month: 10, dateString: "Октябрь 1939",
        description: "Территория Польши полностью оккупирована и разделена между Германией и СССР согласно договоренностям.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 52, y: 40 }, // ПОДСТРОЙТЕ! (Польша)
        connectionText: "Польская кампания завершилась полным разделом страны."
    },
    {
        id: "hitler_peace_offer_october",
        type: "main",
        title: "Мирное предложение Гитлера Западу",
        year: 1939, month: 10, dateString: "6 октября 1939",
        description: "После победы в Польше Гитлер выступает в Рейхстаге с предложением мира Великобритании и Франции на условиях признания германских завоеваний.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 48.5, y: 39 }, // ПОДСТРОЙТЕ! (Берлин)
        relatedEventIds: ["western_allies_reject_peace"]
    },
    {
        id: "western_allies_reject_peace",
        type: "related",
        title: "Западные союзники отвергают предложение",
        year: 1939, month: 10, dateString: "Октябрь 1939",
        description: "Великобритания и Франция отвергают 'мирные' предложения Гитлера, 'Странная война' продолжается.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 46.5, y: 37.5 }, // ПОДСТРОЙТЕ! (Лондон/Париж)
        connectionText: "Предложения Гитлера были расценены как попытка узаконить агрессию."
    },
    {
        id: "u_47_sinks_royal_oak",
        type: "main",
        title: "Потопление HMS Royal Oak",
        year: 1939, month: 10, dateString: "14 октября 1939",
        description: "Немецкая подлодка U-47 под командованием Гюнтера Прина проникает на главную базу британского флота Скапа-Флоу и топит линкор Royal Oak.",
        image: "assets/event_images/placeholder_event.jpg", // ЗАМЕНИТЕ
        coords: { x: 44, y: 28 }, // ПОДСТРОЙТЕ! (Скапа-Флоу, Шотландия)
        relatedEventIds: []
    },

    // НОЯБРЬ 1939 (существующие, для контекста)
    {
        id: "winter_war_starts", type: "main", title: "Начало Советско-финской войны", year: 1939, month: 11, dateString: "30 ноября 1939",
        description: "СССР нападает на Финляндию.", image: "assets/event_images/placeholder_event.jpg", coords: { x: 52, y: 28 }, relatedEventIds: ["league_nations_expels_ussr_dec"]
    },
    // ДЕКАБРЬ 1939 (существующие)
    {
        id: "battle_river_plate", type: "main", title: "Битва у Ла-Платы", year: 1939, month: 12, dateString: "13 декабря 1939",
        description: "Повреждение 'Адмирала Графа Шпее'.", image: "assets/event_images/placeholder_event.jpg", coords: { x: 30, y: 85 }, relatedEventIds: []
    },
    {
        id: "league_nations_expels_ussr_dec", type: "related", title: "Исключение СССР из Лиги Наций", year: 1939, month: 12, dateString: "14 декабря 1939",
        description: "За агрессию против Финляндии.", image: "assets/event_images/placeholder_event.jpg", coords: { x: 48, y: 30 }, connectionText: "Агрессия против Финляндии привела к международной изоляции СССР."
    },

    // ... (далее события 1940 года, которые вы уже добавили, их нужно будет пересмотреть и добавить новые)
    // Я оставлю существующие события 1940 года для полноты, но их тоже нужно будет детализировать
    {
        id: "winter_war_continues", type: "main", title: "Зимняя война: Бои на линии Маннергейма", year: 1940, month: 1, dateString: "Январь 1940",
        description: "Тяжелые бои на Карельском перешейке.", image: "assets/event_images/placeholder_event.jpg", coords: { x: 53, y: 29 }, relatedEventIds: []
    },
    // ... и так далее для 1940, как в вашем предыдущем файле events.js, но с необходимостью детализации ...
];

const ww2Months = [
    { value: 1, name: "Январь" }, { value: 2, name: "Февраль" }, { value: 3, name: "Март" },
    { value: 4, name: "Апрель" }, { value: 5, name: "Май" }, { value: 6, name: "Июнь" },
    { value: 7, name: "Июль" }, { value: 8, name: "Август" }, { value: 9, name: "Сентябрь" },
    { value: 10, name: "Октябрь" }, { value: 11, name: "Ноябрь" }, { value: 12, name: "Декабрь" }
];
const WAR_START_YEAR = 1939;
const WAR_START_MONTH = 9;
const WAR_END_YEAR = 1945;
const WAR_END_MONTH = 9;