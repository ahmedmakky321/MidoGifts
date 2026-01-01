import { OccasionType, Language, ArabicDialect } from '../types';

type MessagesByOccasion = Record<OccasionType, string>;
type MessagesByDialect = Record<ArabicDialect, MessagesByOccasion>;

export const aiMessages: Record<Language, MessagesByOccasion | MessagesByDialect> = {
  en: {
    birthday: 'Happy Birthday! Wishing you a year filled with joy, success, and beautiful memories. You deserve all the happiness in the world.',
    'mothers-day': 'Happy Mother\'s Day! Thank you for all your sacrifices and endless love. You are the most wonderful person in my life.',
    ramadan: 'Ramadan Kareem! May this blessed month bring you health and happiness. May Allah accept all our good deeds.',
    'eid-fitr': 'Eid Mubarak! May Allah accept all our good deeds. Wishing you and your family joy and blessings.',
    'eid-adha': 'Eid Al-Adha Mubarak! May Allah accept our worship and bless us with His mercy. Wishing you happiness and peace.',
    christmas: 'Merry Christmas! Wishing you a season full of joy and happiness with your loved ones. Peace and blessings to you.',
    graduation: 'Congratulations on your graduation! You did amazing and proved yourself. Wishing you a bright future full of success and achievements.',
    wedding: 'Congratulations! Wishing you a lifetime filled with love and happiness. May you always be there for each other.',
    'new-baby': 'Congratulations on your new baby! May this little one bring you endless joy and blessings. Wishing you all the best!',
    love: 'I love you so much! You mean the world to me and I hope you stay by my side forever. Thank you for being in my life.',
    sympathy: 'My deepest condolences. May you find comfort and peace during this difficult time. You are in our thoughts and prayers.'
  },
  ar: {
    msa: {
      birthday: 'عيد ميلاد سعيد! أتمنى لك عامًا مليئًا بالفرح والنجاح والذكريات الجميلة. أنت تستحق كل السعادة في العالم.',
      'mothers-day': 'كل عام وأنتِ بخير يا أمي الحبيبة! شكرًا لك على كل التضحيات والحب اللامتناهي. أنتِ الأروع في حياتي.',
      ramadan: 'رمضان كريم! أعاده الله عليك بالصحة والسعادة. أدعو الله أن يتقبل منا ومنك صالح الأعمال.',
      'eid-fitr': 'عيد فطر مبارك! تقبل الله منا ومنكم صالح الأعمال. أسأل الله أن يديم الفرحة في قلوبنا.',
      'eid-adha': 'عيد أضحى مبارك! تقبل الله منا ومنكم الطاعات. أعاده الله علينا بالخير والبركات.',
      christmas: 'عيد ميلاد سعيد! أتمنى لك عيدًا مليئًا بالفرح والسعادة مع أحبائك. كل عام وأنت بألف خير.',
      graduation: 'مبروك التخرج! أنت قمت بعمل رائع وأثبتّ جدارتك. أتمنى لك مستقبلًا مشرقًا مليئًا بالنجاح والإنجازات.',
      wedding: 'ألف مبروك! أتمنى لكما حياة مليئة بالحب والسعادة. دمتما لبعضكما البعض وعشتما في هناء.',
      'new-baby': 'مبروك المولود الجديد! بارك الله لكم في الموهوب وشكرتم الواهب. جعله الله من الصالحين.',
      love: 'أحبك كثيرًا! أنت تعني لي الكثير وأتمنى أن تبقى معي دائمًا. شكرًا لكونك جزءًا من حياتي.',
      sympathy: 'البقاء لله. أدعو الله أن يلهمك الصبر والسلوان. أنت في قلوبنا ودعائنا.'
    },
    egyptian: {
      birthday: 'كل سنة وانت طيب! ربنا يديك الصحة والسعادة وينور طريقك. انت تستاهل كل خير يا غالي.',
      'mothers-day': 'كل سنة وانتي طيبة يا احلى ماما! ربنا يخليكي ليا ويحفظك. انتي اغلى واحدة عندي.',
      ramadan: 'رمضان كريم! ربنا يتقبل منا ومنكم صالح الاعمال ويبلغنا ليلة القدر. كل سنة وانت بخير.',
      'eid-fitr': 'كل سنة وانت طيب! ربنا يتقبل صيامنا وقيامنا ويجعله من المقبولين. عيد سعيد عليك.',
      'eid-adha': 'عيد مبارك! تقبل الله منا ومنكم وكل سنة وانتم طيبين. ربنا يديمها افراح.',
      christmas: 'كل سنة وانت طيب! عيد سعيد وسنة حلوة عليك وعلى كل اللي بتحبهم.',
      graduation: 'مبروك التخرج! الف الف مبروك يا بطل، انت فخرنا كلنا. ربنا يوفقك في حياتك كلها.',
      wedding: 'الف مبروك! الله يتمم ليكم على خير ويجمعكم في الخير والسعادة. مبروك للعروسين.',
      'new-baby': 'مبروك المولود! ربنا يبارك فيه ويخليه ليكم ويجعله من الصالحين. الف مبروك.',
      love: 'بحبك قوي! انت كل حاجة بالنسبالي وربنا يخليك ليا. ميرسي انك في حياتي.',
      sympathy: 'البقاء لله. ربنا يصبركم ويلهمكم الصبر والسلوان. انتم في قلبي ودعائي.'
    },
    saudi: {
      birthday: 'كل عام وأنت بخير! الله يسعدك ويحفظك ويوفقك. تستاهل كل خير والله.',
      'mothers-day': 'كل عام وأنتِ بخير يا أمي! الله يحفظك ويخليك لنا. أنتِ أغلى ما عندي.',
      ramadan: 'رمضان مبارك! الله يتقبل منا ومنكم صالح الأعمال. كل عام وأنت بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله طاعتكم وأعاده عليكم بالخير. عساكم من عواده.',
      'eid-adha': 'عيد أضحى مبارك! تقبل الله منا ومنكم وجعله عيد مبارك. عساكم من عواده.',
      christmas: 'كل عام وأنت بخير! عيد سعيد وأيام جميلة مع أهلك وأحبابك.',
      graduation: 'مبروك التخرج! الله يوفقك ويسهل أمورك. مبروك وألف مبروك يا بطل.',
      wedding: 'مبروك الزواج! الله يتمم لكم على خير ويجمع بينكم في خير. ألف مبروك.',
      'new-baby': 'مبروك المولود! بارك الله لكم وبارك عليكم وجعله من الصالحين.',
      love: 'أحبك والله! أنت كل شي بالنسبة لي والله يخليك لي. شكرًا لوجودك.',
      sympathy: 'البقاء لله. الله يصبركم ويلهمكم الصبر والسلوان. في قلوبنا ودعواتنا.'
    },
    emirati: {
      birthday: 'كل سنة وانت طيب! الله يخليك لنا ويسعدك. انت تستاهل كل خير.',
      'mothers-day': 'كل عام وانتي بخير يا يمه! الله يحفظك ويخليك لنا. انتي اغلى شي عندي.',
      ramadan: 'رمضان كريم! ربي يتقبل منا ومنكم صالح الاعمال. كل سنة وانتم بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله طاعتكم وعساكم من عواده. عيد سعيد عليكم.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم وعساكم من عواده. كل سنة وانتم طيبين.',
      christmas: 'كل سنة وانت بخير! عيد سعيد وايام حلوة مع اهلك واحبابك.',
      graduation: 'مبروك التخرج! الله يوفقك ويسهل طريقك. مبروك يا بطل.',
      wedding: 'الف مبروك! الله يتمم لكم على خير ويجمع بينكم بالخير. مبروك للعروسين.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم ذخر. الف مبروك.',
      love: 'احبك والله! انت كل شي عندي والله يخليك لي. شكرا لوجودك.',
      sympathy: 'البقاء لله. الله يصبركم ويلهمكم الصبر. انتم في قلوبنا ودعائنا.'
    },
    kuwaiti: {
      birthday: 'كل سنة وانت طيب! الله يحفظك ويسعدك. انت تستاهل كل خير بالدنيا.',
      'mothers-day': 'كل سنة وانتي بخير يمه! الله يخليج لي ويحفظج. انتي احلى واحدة.',
      ramadan: 'شهر مبارك! الله يتقبل منا ومنكم. كل سنة وانتم بخير.',
      'eid-fitr': 'عيد مبارك! عساكم من عواده ومن الفايزين. كل عام وانتم بخير.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم وعساكم من عواده.',
      christmas: 'كل سنة وانت طيب! عيد سعيد وايام حلوة.',
      graduation: 'الف مبروك! الله يوفقك ويسهل امورك. مبروك التخرج يا شاطر.',
      wedding: 'الف مبروك! الله يتمم لكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم. الف مبروك.',
      love: 'احبك والله! انت كل شي عندي. الله يخليك لي.',
      sympathy: 'البقاء لله. الله يصبركم ويلهمكم الصبر. انتم بقلوبنا.'
    },
    yemeni: {
      birthday: 'كل عام وانت بخير! الله يهنيك ويسعدك. تستاهل كل خير والله.',
      'mothers-day': 'كل عام وانتي بخير يا يمه! الله يحفظك ويخليك لنا. انتي الغالية.',
      ramadan: 'رمضان كريم! الله يتقبل منا ومنكم. كل عام وانتم بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله منا ومنكم الصيام والقيام. كل عام وانتم بخير.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله ضحاياكم وطاعتكم. كل عام وانتم طيبين.',
      christmas: 'كل عام وانت بخير! عيد سعيد عليك وعلى اهلك.',
      graduation: 'مبروك التخرج! الله يوفقك في حياتك. مبروك يا ناجح.',
      wedding: 'الف مبروك! الله يتمم لكم على خير ويبارك فيكم. مبروك.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم ذرية صالحة.',
      love: 'احبك والله! انت كل شي عندي. الله يحفظك لي.',
      sympathy: 'البقاء لله. الله يصبركم وييسر امركم. في دعائنا.'
    },
    jordanian: {
      birthday: 'كل سنة وانت سالم! الله يخليك ويسعدك. انت بتستاهل كل خير.',
      'mothers-day': 'كل سنة وانتي بخير يا ماما! الله يحفظك ويخليكي النا. انتي احلى ام.',
      ramadan: 'رمضان كريم! الله يتقبل منا ومنكم صالح الاعمال. كل سنة وانتو بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله طاعتكم وجعلكم من الفايزين. عيد سعيد.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم. كل سنة وانتو طيبين.',
      christmas: 'كل سنة وانت بخير! عيد سعيد وايام حلوة مع اهلك.',
      graduation: 'مبروك التخرج! الله يوفقك ويسهلك. مبروك يا شاطر.',
      wedding: 'الف مبروك! الله يتمملكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم. الف مبروك.',
      love: 'بحبك كتير! انت كل شي عندي. الله يخليك الي.',
      sympathy: 'البقاء لله. الله يصبركم ويعوضكم خير. في قلوبنا ودعائنا.'
    },
    palestinian: {
      birthday: 'كل سنة وانت سالم! الله يخليك ويسعدك. انت بتستاهل كل خير.',
      'mothers-day': 'كل سنة وانتي بخير يا يما! الله يحفظك ويخليكي النا. انتي اغلى حدا.',
      ramadan: 'رمضان كريم! الله يتقبل منا ومنكم صالح الاعمال. كل سنة وانتو بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله طاعتكم وجعلكم من السعداء. عيد سعيد.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم الطاعات. كل سنة وانتو طيبين.',
      christmas: 'كل سنة وانت بخير! عيد سعيد وايام حلوة.',
      graduation: 'مبروك التخرج! الله يوفقك ويسهل طريقك. مبروك يا بطل.',
      wedding: 'الف مبروك! الله يتمملكم على خير ويجمعكم بالخير. مبروك.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم. الف مبروك.',
      love: 'بحبك كتير! انت كل شي عندي. الله يخليك الي.',
      sympathy: 'البقاء لله. الله يصبركم ويعوضكم خير. في قلوبنا.'
    },
    lebanese: {
      birthday: 'كل سنة وانت سالم! الله يخليك ويسعدك. انت بتستاهل كل خير بالدني.',
      'mothers-day': 'كل سنة وانتي بخير يا ماما! الله يحفظك ويخليكي النا. انتي احلى واحدة.',
      ramadan: 'رمضان كريم! الله يتقبل منا ومنكم. كل سنة وانتو بالف خير.',
      'eid-fitr': 'عيد مبارك! تقبل الله صيامكم وقيامكم. كل سنة وانتو طيبين.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم. عيد سعيد عليكم.',
      christmas: 'كل سنة وانت طيب! عيد سعيد وسنة حلوة عليك وعلى اهلك.',
      graduation: 'مبروك التخرج! الله يوفقك بحياتك. مبروك يا شاطر.',
      wedding: 'الف مبروك! الله يتمملكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! الله يخليه النكم ويحفظه. الف مبروك.',
      love: 'بحبك كتير! انت كل شي عندي. الله يخليك الي.',
      sympathy: 'البقاء لله. الله يصبركم ويقويكم. انتو بقلوبنا.'
    },
    syrian: {
      birthday: 'كل سنة وانت سالم! الله يخليك ويسعدك. انت بتستاهل كل خير.',
      'mothers-day': 'كل سنة وانتي بخير يا ماما! الله يحفظك ويخليكي النا. انتي احلى ام بالدني.',
      ramadan: 'رمضان مبارك! الله يتقبل منا ومنكم صالح الاعمال. كل سنة وانتو بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله طاعتكم. كل سنة وانتو طيبين.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم. عيد سعيد عليكم.',
      christmas: 'كل سنة وانت طيب! عيد سعيد وسنة حلوة.',
      graduation: 'مبروك التخرج! الله يوفقك ويسهل طريقك. مبروك يا شاطر.',
      wedding: 'الف مبروك! الله يتمملكم على خير ويجمعكم بالخير. مبروك.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم. الف مبروك.',
      love: 'بحبك كتير! انت كل شي عندي. الله يخليك الي.',
      sympathy: 'البقاء لله. الله يصبركم ويلهمكم الصبر. في قلوبنا.'
    },
    moroccan: {
      birthday: 'عيد ميلاد سعيد! الله يبارك فيك ويحفظك. راك تستاحق كل خير.',
      'mothers-day': 'كل عام وانتي بخير يا لالة! الله يحفظك ويخليك لينا. نتيا احسن واحدة.',
      ramadan: 'رمضان مبارك! الله يتقبل منا وم��كم. عواشركم مبروكة.',
      'eid-fitr': 'عيد مبارك! الله يتقبل صيامنا وقيامنا. كل عام ونتوما بخير.',
      'eid-adha': 'عيد الاضحى مبارك! تقبل الله منا ومنكم. عيد سعيد عليكم.',
      christmas: 'كل عام وانت بخير! عيد سعيد وايام زوينة.',
      graduation: 'مبروك النجاح! الله يوفقك في حياتك. مبروك عليك.',
      wedding: 'الف مبروك! الله يتمملكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! الله يبارك فيه ويخليه لكم. الف مبروك.',
      love: 'كانبغيك بزاف! نتا كل شي عندي. الله يحفظك ليا.',
      sympathy: 'انا لله وانا اليه راجعون. الله يصبركم ويرحمه. في قلوبنا.'
    },
    algerian: {
      birthday: 'عيد ميلاد سعيد! ربي يحفظك ويهنيك. راك تستاهل كل خير.',
      'mothers-day': 'كل عام وانتي بخير يا لالة! ربي يحفظك ويخليك لينا. راكي احسن واحدة.',
      ramadan: 'رمضان كريم! ربي يتقبل منا ومنكم. كل عام وانتوما بخير.',
      'eid-fitr': 'عيد مبارك! ربي يتقبل صيامنا وقيامنا. كل عام ونتوما بخير.',
      'eid-adha': 'عيد الاضحى مبارك! تقبل الله منا ومنكم. عيد سعيد.',
      christmas: 'كل عام وراك بخير! عيد سعيد وايام ملاح.',
      graduation: 'مبروك النجاح! ربي يوفقك في حياتك كاملة. مبروك عليك.',
      wedding: 'الف مبروك! ربي يتمملكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! ربي يبارك فيه ويخليه لكم. الف مبروك.',
      love: 'نحبك بزاف! نتا كل شي عندي. ربي يحفظك ليا.',
      sympathy: 'البقاء لله. ربي يصبركم ويرحمه. في قلوبنا ودعائنا.'
    },
    tunisian: {
      birthday: 'عيد ميلاد سعيد! ربي يحفظك ويخليك. انت تستاهل كل خير.',
      'mothers-day': 'كل عام وانتي بخير يا عمي! ربي يحفظك ويخليكي لنا. انتي احلى واحدة.',
      ramadan: 'رمضان كريم! ربي يتقبل منا ومنكم. كل عام وانتوما بخير.',
      'eid-fitr': 'عيد مبارك! ربي يتقبل صيامنا وقيامنا. كل عام ونتوما بخير.',
      'eid-adha': 'عيد الاضحى مبارك! تقبل الله منا ومنكم. عيد سعيد عليكم.',
      christmas: 'كل عام وانت بخير! عيد سعيد وايام بهية.',
      graduation: 'مبروك النجاح! ربي يوفقك في حياتك. مبروك عليك.',
      wedding: 'الف مبروك! ربي يتمملكم على خير. بالرفاه والبنين.',
      'new-baby': 'مبروك المولود! ربي يبارك فيه ويخليه لكم. الف مبروك.',
      love: 'نحبك برشا! انت كل شي عندي. ربي يحفظك ليا.',
      sympathy: 'البقاء لله. ربي يصبركم ويرحمه. في قلوبنا.'
    },
    sudanese: {
      birthday: 'كل سنة وانت طيب! ربنا يخليك ويسعدك. انت بتستاهل كل خير.',
      'mothers-day': 'كل سنة وانتي بخير يا يما! ربنا يحفظك ويخليكي لينا. انتي احلى واحدة.',
      ramadan: 'رمضان كريم! ربنا يتقبل منا ومنكم صالح الاعمال. كل سنة وانتو بخير.',
      'eid-fitr': 'عيد مبارك! تقبل الله صيامنا وقيامنا. كل سنة وانتو طيبين.',
      'eid-adha': 'عيد اضحى مبارك! تقبل الله منا ومنكم. عيد سعيد عليكم.',
      christmas: 'كل سنة وانت طيب! عيد سعيد وايام جميلة.',
      graduation: 'مبروك التخرج! ربنا يوفقك في حياتك. مبروك يا شاطر.',
      wedding: 'الف مبروك! ربنا يتمملكم على خير ويجمعكم بالخير. مبروك.',
      'new-baby': 'مبروك المولود! بارك الله فيه وخلاه لكم ذرية صالحة. الف مبروك.',
      love: 'بحبك كتير! انت كل حاجة عندي. ربنا يخليك ليا.',
      sympathy: 'البقاء لله. ربنا يصبركم ويلهمكم الصبر. في قلوبنا.'
    }
  },
  franco: {
    birthday: '3eed milad sa3eed! Rabbena yekhallik w yesa3dak. Enta testahel kol kheir.',
    'mothers-day': 'Kol sana w enty tayeba ya mama! Rabbena yekhallikie lena w yehfazek. Enty aghlaa wahda.',
    ramadan: 'Ramadan kareem! Rabbena yetakabal menna w menkom saleh el a3mal. Kol sana w entom bekheir.',
    'eid-fitr': 'Eid mubarak! Ta2abal Allah sayamna w 2eyamna. Kol sana w entom tayyebeen.',
    'eid-adha': 'Eid adha mubarak! Ta2abal Allah menna w menkom. 3eed sa3eed 3alaykom.',
    christmas: 'Kol sana w enta tayyeb! 3eed sa3eed w ayam gameela ma3 el 3eila.',
    graduation: 'Mabrook el takharrog! Rabbena yewaf2ak fe hayatak. Mabrook ya batal.',
    wedding: 'Alf mabrook! Rabbena yetammem lekom 3ala kheir. Bel rafah wel baneen.',
    'new-baby': 'Mabrook el mawlood! Barak Allah feeh w khallah lekom. Alf mabrook.',
    love: 'Ba7ebbak keteer! Enta kol 7aga 3andy. Rabbena yekhallik laya.',
    sympathy: 'El ba2aa lellah. Rabbena yesabbarkom w yel hemkom el sabr. Fe 2olooobna.'
  },
  fr: {
    birthday: 'Joyeux anniversaire! Je vous souhaite une année remplie de joie, de succès et de beaux souvenirs. Vous méritez tout le bonheur du monde.',
    'mothers-day': 'Bonne fête des mères! Merci pour tous vos sacrifices et votre amour sans fin. Vous êtes la personne la plus merveilleuse de ma vie.',
    ramadan: 'Ramadan Karim! Que ce mois béni vous apporte santé et bonheur. Qu\'Allah accepte toutes nos bonnes actions.',
    'eid-fitr': 'Aïd Moubarak! Qu\'Allah accepte toutes nos bonnes actions. Je vous souhaite, ainsi qu\'à votre famille, joie et bénédictions.',
    'eid-adha': 'Aïd Al-Adha Moubarak! Qu\'Allah accepte notre adoration et nous bénisse de Sa miséricorde. Je vous souhaite bonheur et paix.',
    christmas: 'Joyeux Noël! Je vous souhaite une saison pleine de joie et de bonheur avec vos proches. Paix et bénédictions pour vous.',
    graduation: 'Félicitations pour votre diplôme! Vous avez été formidable et vous vous êtes prouvé. Je vous souhaite un avenir brillant plein de succès.',
    wedding: 'Félicitations! Je vous souhaite une vie remplie d\'amour et de bonheur. Soyez toujours là l\'un pour l\'autre.',
    'new-baby': 'Félicitations pour votre nouveau bébé! Que ce petit être vous apporte une joie et des bénédictions infinies. Meilleurs vœux!',
    love: 'Je t\'aime tellement! Tu es tout pour moi et j\'espère que tu resteras toujours à mes côtés. Merci d\'être dans ma vie.',
    sympathy: 'Mes plus sincères condoléances. Puissiez-vous trouver réconfort et paix en ces moments difficiles. Vous êtes dans nos pensées et nos prières.'
  },
  es: {
    birthday: '¡Feliz cumpleaños! Te deseo un año lleno de alegría, éxito y hermosos recuerdos. Mereces toda la felicidad del mundo.',
    'mothers-day': '¡Feliz Día de la Madre! Gracias por todos tus sacrificios y amor infinito. Eres la persona más maravillosa de mi vida.',
    ramadan: '¡Ramadán Karim! Que este mes bendito te traiga salud y felicidad. Que Alá acepte todas nuestras buenas obras.',
    'eid-fitr': '¡Eid Mubarak! Que Alá acepte todas nuestras buenas obras. Les deseo a ti y a tu familia alegría y bendiciones.',
    'eid-adha': '¡Eid Al-Adha Mubarak! Que Alá acepte nuestra adoración y nos bendiga con Su misericordia. Te deseo felicidad y paz.',
    christmas: '¡Feliz Navidad! Te deseo una temporada llena de alegría y felicidad con tus seres queridos. Paz y bendiciones para ti.',
    graduation: '¡Felicidades por tu graduación! Lo hiciste increíble y te probaste a ti mismo. Te deseo un futuro brillante lleno de éxito.',
    wedding: '¡Felicidades! Les deseo una vida llena de amor y felicidad. Que siempre estén ahí el uno para el otro.',
    'new-baby': '¡Felicidades por tu nuevo bebé! Que este pequeño te traiga alegría y bendiciones infinitas. ¡Les deseo lo mejor!',
    love: '¡Te amo mucho! Significas el mundo para mí y espero que te quedes a mi lado para siempre. Gracias por estar en mi vida.',
    sympathy: 'Mis más profundas condolencias. Que encuentres consuelo y paz en estos momentos difíciles. Estás en nuestros pensamientos y oraciones.'
  }
};

export function getAIMessage(language: Language, dialect: ArabicDialect, occasion: OccasionType): string {
  if (language === 'ar') {
    const dialectMessages = aiMessages.ar as MessagesByDialect;
    return dialectMessages[dialect]?.[occasion] || dialectMessages.msa[occasion];
  }

  const messages = aiMessages[language] as MessagesByOccasion;
  return messages[occasion] || messages.birthday;
}
