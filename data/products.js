const products = [
  {
    title: "Topper Tie Break",
    price: 12.99,
    description:
      "Topper se destaca en el mercado por ofrecer productos de calidad, confort y diseño que unen moda y deporte. Acerca tendencias y busca que las personas puedan verse y sentirse bien dentro y fuera del campo de juego.",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_763169-MLA49129517558_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_635541-MLA49129527451_022022-O.webp",
    ],
    stock: 45,
    category: "zapatillas",
    branch: "Nike",
    rating: 0,
  },
  {
    title: "Zapatillas Nike Zoom Winflo 8 Shield",
    price: 46.99,
    description:
      "Las Zapatillas Nike Zoom Winflo 8 Shield aportan amortiguación y estabilidad en partes iguales. La unidad Air Zoom amortigua tus pisadas y brinda una máxima comodidad a la hora de cada carrera, reduciendo la posibilidad de lesiones y dolores. La tracción de la suela inspirada en neumáticos resiste a diversas superficies, incluso calles mojadas y húmedas; el patrón Storm Tread asegura esta estabilidad. La capellada y la lengüeta con refuerzos mantienen el agua alejada de tus pies para mantenerte fresco durante más tiempo. Su estilo inconfundible es fácil de combinar con todos tus outfits y versátil para que puedas ir de las pistas a cualquier lugar.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwddf5e47a/products/NI_DC3727-001/NI_DC3727-001-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw15c87639/products/NI_DC3727-001/NI_DC3727-001-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwa2eb690c/products/NI_DC3727-001/NI_DC3727-001-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw9b1206fe/products/NI_DC3727-001/NI_DC3727-001-4.JPG",
    ],
    stock: 25,
    category: "zapatillas",
    branch: "Nike",
    rating: 0,
  },
  {
    title: "Zapatillas Nike Air Zoom Pegasus 38",
    price: 39.99,
    description:
      "Las Zapatillas Nike Air Zoom Pegasus 38 no son otra cosa que una de las zapatillas más destacadas del mundo del running. Su mejorada mediasuela Nike React más elástica, ligera y con más espuma con menor volumen te brinda una amortiguación superadora; se ajustó la unidad Zoom Air de la puntera para que tengas una sensación más suave y mejor rebote en cada pisada, reubicada cerca al pie para darte una respuesta inmediata. Su correa en el medio pie te da un ajuste más seguro, además, su suela de goma confeccionada en material Nike Grind aporta tracción y las vuelve fundamentales para runners amateurs que quieran hacer de su jornada de entrenamiento, una de placer.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw845001e9/products/NI_CW7358-400/NI_CW7358-400-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw843fe6b8/products/NI_CW7358-400/NI_CW7358-400-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwb948ece3/products/NI_CW7358-400/NI_CW7358-400-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw2d4ecb8e/products/NI_CW7358-400/NI_CW7358-400-4.JPG",
    ],
    stock: 32,
    category: "zapatillas",
    branch: "Nike",
    rating: 0,
  },
  {
    title: "Botinero Dribbling Classic",
    price: 22.99,
    description:
      "Las Zapatillas Nike Air Zoom Pegasus 38 no son otra cosa que una de las zapatillas más destacadas del mundo del running. Su mejorada mediasuela Nike React más elástica, ligera y con más espuma con menor volumen te brinda una amortiguación superadora; se ajustó la unidad Zoom Air de la puntera para que tengas una sensación más suave y mejor rebote en cada pisada, reubicada cerca al pie para darte una respuesta inmediata. Su correa en el medio pie te da un ajuste más seguro, además, su suela de goma confeccionada en material Nike Grind aporta tracción y las vuelve fundamentales para runners amateurs que quieran hacer de su jornada de entrenamiento, una de placer.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw7cf71252/products/DG_DFAVBL009RB/DG_DFAVBL009RB-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw85791b76/products/DG_DFAVBL009RB/DG_DFAVBL009RB-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwb791f38a/products/DG_DFAVBL009RB/DG_DFAVBL009RB-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw0ca0547b/products/DG_DFAVBL009RB/DG_DFAVBL009RB-4.JPG",
    ],
    stock: 32,
    category: "zapatillas",
    branch: "Dribbling",
    rating: 0,
  },
  {
    title: "Botinero Dribbling Classic Blue",
    price: 22.99,
    description:
      "El Botinero Dribbling Classic es muy versátil y cómodo, protege los botines y los separa del resto del uniforme. Incorpora una manija de mano para llevarlo a todos lados, a un partido, a entrenar o simplemente en tu día a día. Es muy espacioso para guardar lo que necesitas para afrontar el próximo partido. Está confeccionado en tela bagún muy duradera y resistente al desgaste. Todo listo para salir a la cancha.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwaf089e9a/products/DG_DFAVBL009USU/DG_DFAVBL009USU-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwf5c91065/products/DG_DFAVBL009USU/DG_DFAVBL009USU-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw37ff0346/products/DG_DFAVBL009USU/DG_DFAVBL009USU-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw71f64f85/products/DG_DFAVBL009USU/DG_DFAVBL009USU-4.JPG",
    ],
    stock: 62,
    category: "bolsos",
    branch: "Dribbling",
    rating: 0,
  },
  {
    title: "Botinero Gilbert Club Boot",
    price: 46.99,
    description:
      "El botinero Gilbert Club Boot está compuesto de poliéster y es un aliado a la hora de llevar tus botines al club. Su apertura con cierre frontal completo te brinda una mayor comodidad, mientras que su calce es óptimo para que puedas incluir un par de medias o algún accesorio extra.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw41479f85/products/GI_8302430/GI_8302430-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw9118978b/products/GI_8302430/GI_8302430-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwbe377c95/products/GI_8302430/GI_8302430-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwfa7e2b65/products/GI_8302430/GI_8302430-4.JPG",
    ],
    stock: 40,
    category: "bolsos",
    branch: "Gilbert",
    rating: 0,
  },
  {
    title: "Mochila Puma Beta",
    price: 79.99,
    description:
      "Todo lo que necesitás y mucho más, lo vas a poder llevar en la Mochila Puma Beta. Cuenta con un compartimento muy amplio para llevar tus cosas al gimnasio o a la oficina y dos de malla laterales para tu botella o vaso térmico. Su diseño en gráficos estampados y con inscripciones de la marca te dan un look moderno para combinar con tu outfit.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw2a4b2a4c/products/PU_078929-03/PU_078929-03-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw602b9f65/products/PU_078929-03/PU_078929-03-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw45e414d9/products/PU_078929-03/PU_078929-03-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwc48f17f7/products/PU_078929-03/PU_078929-03-4.JPG",
    ],
    stock: 40,
    category: "bolsos",
    branch: "Puma",
    rating: 0,
  },
  {
    title: "Riñonera Puma Core Up",
    price: 6.99,
    description:
      "Completá tu outfit con la Riñonera Puma Core Up, un accesorio muy funcional además de moderno. Alargada y con una correa larga que te permite usarla cruzada. Cuenta con un compartimento principal muy amplio para que lleves todo lo necesario para afrontar tu día y uno atrás para cosas que necesitás tener más seguras y al alcance rápido. Su confección en sintético simil cuero y la estampa Puma en el frente es todo lo que necesita tu look.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw92da44ca/products/PU_079153-01/PU_079153-01-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw02e26853/products/PU_079153-01/PU_079153-01-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw37ec8bbd/products/PU_079153-01/PU_079153-01-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw94b270e2/products/PU_079153-01/PU_079153-01-5.JPG",
    ],
    stock: 72,
    category: "accesorios",
    branch: "Puma",
    rating: 0,
  },
  {
    title: "Cinturón Under Armour Braided Golf Belt",
    price: 15.99,
    description:
      "El Cinturón Under Armour Braided Golf Belt te da la flexibilidad que necesitás en el campo de golf o si lo prefieres en tus outfits casuales. Su hebilla con cierre de metal abre y cierra fácilmente y es ajustable a tu cuerpo para que te sientas cómodo mientras lo lleves puesto.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwa3ffd77f/products/UA_1361569-100/UA_1361569-100-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw758c5815/products/UA_1361569-100/UA_1361569-100-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw13103491/products/UA_1361569-100/UA_1361569-100-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw13103491/products/UA_1361569-100/UA_1361569-100-3.JPG",
    ],
    stock: 72,
    category: "accesorios",
    branch: "Under Armor",
    rating: 0,
  },
  {
    title: "Riñonera Puma Training",
    price: 5.99,
    description:
      "Completá tu outfit con la Riñonera Puma Core Up, un accesorio muy funcional además de moderno. Alargada y con una correa larga que te permite usarla cruzada. Cuenta con un compartimento principal muy amplio para que lleves todo lo necesario para afrontar tu día y uno atrás para cosas que necesitás tener más seguras y al alcance rápido. Su confección en sintético simil cuero y la estampa Puma en el frente es todo lo que necesita tu look.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwc91759fd/products/PU_078214-03/PU_078214-03-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw3f737d75/products/PU_078214-03/PU_078214-03-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw5cb2fefd/products/PU_078214-03/PU_078214-03-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwc74d6a0b/products/PU_078214-03/PU_078214-03-4.JPG",
    ],
    stock: 72,
    category: "accesorios",
    branch: "Puma",
    rating: 0,
  },
  {
    title: "Bolso M-Wave Al Cuadro Bajo Asiento",
    price: 32.99,
    description:
      "El Bolso M-Wave Al Cuadro Bajo Asiento tiene un diseño práctico y ligero para que puedas llevarlo en tu bicicleta evitando molestias. Podes guardar lo indispensable en el y asegurar el ajuste con las tiras resistente con velcro. Cuenta con un detalle reflectivo para que salgas tranquilo a cualquier hora del día.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwcbf93246/products/MW_122356/MW_122356-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw31076084/products/MW_122356/MW_122356-2.JPG",
    ],
    stock: 62,
    category: "bolsos",
    branch: "M-Wave",
    rating: 0,
  },
  {
    title: "Zapatillas Capitan Tt Topper",
    price: 130.99,
    description:
      "Ideales para tu look urbano, cool y atemporal, las Capitan TT, son un clásico de Topper para todos los nostálgicos. Capellada de microfibra de alta calidad. Suela de goma moldeada con propiedades antideslizantes.",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_760046-MLA49150453318_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_947931-MLA49150453319_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_936243-MLA49150453316_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_677022-MLA49150453314_022022-O.webp",
    ],
    stock: 67,
    category: "zapatillas",
    branch: "Dribbling",
    rating: 0,
  },
  {
    title: "Nitro Tech 100% Whey Gold Bonus! 5,51 Lb !! Muscletech",
    price: 999.99,
    description:
      "Descripción ¡NUEVA FÓRMULA, SABOR, CALIDAD Y CANTIDAD SUPERIOR! Nitro-Tech® 100% Whey Gold es sometida a un estricto control de calidad, es probado y verificado por entes regulatorios de supervisión, para garantizar que cada pomo cumpla con los más altos estándares de pureza, calidad y consistencia apropiados para ofrecer un producto Premium.  CIENCIA SUPERIOR – RESULTADOS SUPERIORES Durante más de 20 años, Nitro-Tech ha sido el producto líder en proteínas. Construido en base a una investigación humana y aplicando ciencia de vanguardia, ha ganado la confianza de innumerables consumidores en todo el mundo. Ahora el mismo equipo de investigación y desarrollo ha sido el pionero en desarrollar una nueva fórmula basada en fuentes superiores de proteínas, calidad y fabricación. Presentamos NITRO-TECH 100% WHEY GOLD – una fórmula de proteína pura con péptidos de suero de leche y aislados.  NITRO – TECH 100% WHEY GOLD Los investigadores de MuscleTech revisaron numerosos ensayos clínicos sobre péptidos de suero, y los resultados muestran que los péptidos de suero de leche pueden promover una recuperación rápida del ejercicio e incluso apoyar una respuesta insulinógena para una mejor administración de nutrientes.  Esto significa que usted está recibiendo una proteína ultra-pura, la cual es rápidamente absorbida y digerida, permitiendole recuperarse más rápido, construir más masa muscular magra y obtener mejores resultados de sus sesiones de entrenamiento. Además, los péptidos de suero de leche tienen uno de los valores biológicos más altos (BV) que cualquier fuente de proteínas, un valor dado a las fuentes de proteínas.  LA MEJOR EN SU CLASE Contiene aislados de proteína de suero microfiltrada y concentrada. NITRO-TECH® 100% WHEY GOLD ofrece una absorción superior garantizada. Cada scoop o servicio te dará 24 g de proteína ultra – premium, 5.5 g de BCAA y 4 g de glutamina y precursor. NITRO-TECH 100% WHEY GOLD utiliza un proceso de microfiltración en frío superior para garantizar una proteína de suero de leche de mayor calidad.  Tiene un gran sabor que es superior a los demás de su tipo, NITRO-TECH 100% WHEY GOLD es tan bueno para su paladar, como para sus músculos.  Productos relacionados.",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_661764-MLA49101040165_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_709888-MLA49090672863_022022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_712734-MLA49101015544_022022-O.webp",
    ],
    stock: 35,
    category: "suplementos",
    branch: "Muscletech",
    rating: 0,
  },
  {
    title: "Standard 100% Isolate",
    price: 2200.99,
    description:
      "Este tipo de suplemento ayuda a complementar la alimentación de personas con objetivos o requerimientos nutricionales específicos. Su consumo puede ser indicado por diversos factores, como la duración y la intensidad de la actividad física, el tipo de deporte, el ambiente en el que se practica, la edad, la composición corporal, el peso, entre otros. Es importante resaltar que su uso debe estar acompañado por una alimentación equilibrada y hábitos de vida saludable..",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_838963-MLA51079478397_082022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_769916-MLA46076860804_052021-O.webp",
    ],
    stock: 5,
    category: "suplementos",
    branch: "ENA Sport",
    rating: 0,
  },
  {
    title: "Plant Whey Protein",
    price: 1800.99,
    description:
      "Nueva Proteína Vegana elaborada a base de proteína de arveja concentrada con sabor a Vainilla Caramel. Ideal para Vegetarianos y Veganos!  PLANT PROTEIN es una proteína vegetal de máxima calidad que fue desarrollada para aquellas  personas que eligen una alimentación vegana o vegetariana. Es una excelente opción para  completar el aporte necesario de proteínas diarias de cualquier persona sobre todo en algunas  comidas del día que muchas veces se realizan fuera del hogar. Además, es recomendada como  suplemento para quienes realicen actividad física ya que aporta 20 g de proteína por toma  favoreciendo la recuperación y el aumento de masa muscular. Esta proteína fue formulada con la  menor cantidad de ingredientes posibles, logrando así una proteína sin azúcar, sin lactosa y libre de  conservantes, con un riquísimo sabor a vainilla caramel, una perfecta disolución y la excelente calidad de siempre..",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_813719-MLA46248974687_062021-O.jpg",
      "https://www.demusculos.com/shop/1634-medium_default/starcuts-plant-protein-glucosa.jpg",
      "https://www.demusculos.com/shop/1636-medium_default/starcuts-plant-protein-glucosa.jpg",
      "https://www.demusculos.com/shop/1637-medium_default/starcuts-plant-protein-glucosa.jpg",
    ],
    stock: 12,
    category: "suplementos",
    branch: "ENA Sport",
    rating: 0,
  },
  {
    title: "Zapatillas Deportivas Topper Wind Iv Negras",
    price: 140.09,
    description:
      "Entera de mesh, con refuerzos en puntera, caña y talonera para mayor estabilidad y durabilidad. Serigrafía y frecuencia a lo largo del calzado para mayor visibilidad. - Suela: Entre suela de EVA para reducir la presión y mejorar la absorción del impacto. Insertos de goma resistentes a la abrasión y adherente a todas las superficies. - Ajuste: De cordones..",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_908893-MLA50495683170_062022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_915299-MLA50495683171_062022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_883381-MLA50955388894_082022-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_748829-MLA50495683172_062022-O.webp",
    ],
    stock: 0,
    category: "zapatillas",
    branch: "Topper",
    rating: 0,
  },
  {
    title: "Whey Pro 2.0 Nutrilab",
    price: 2400.99,
    description:
      "WHEY PRO está constituido por proteínas de excelente calidad, las del suero lácteo, y vitaminas, en concentraciones que proporcionan un rendimiento físico óptimo.Las proteínas de suero lácteo (whey protein) son un grupo de proteínas globulares que pueden ser aisladas de la leche. Poseen un altísimo valor biológico y son consideradas proteínas completas, ya que contienen todos los aminoácidos esenciales (los que el organismo no es capaz de sintetizar por sí mismo), y son una rica fuente de aminoácidos de cadena ramificada (bcaa), necesarios para fortalecer el sistema inmune, potenciar la producción de la hormona del crecimiento, el anabolismo y la regeneración del tejido muscular.  La combinación perfecta de aminoácidos esenciales y de rápida absorción, genera la base para la preservación y la recuperación de la masa muscular después del entrenamiento, disminuyendo el efecto catabólico y aumentando la síntesis proteica.  WHEY PRO ayuda a acelerar la reconstrucción y la recuperación de los músculos, dando lugar a la producción de un músculo consistente..",
    pictureURL: [
      "https://http2.mlstatic.com/D_NQ_NP_649385-MLA43464749729_092020-O.jpg",
      "https://http2.mlstatic.com/D_NQ_NP_968328-MLA49946985893_052022-O.webp",
    ],
    stock: 10,
    category: "suplementos",
    branch: "Nutrilab",
    rating: 0,
  },
  {
    title: "Whey Protein Standard",
    price: 2000.99,
    description:
      "Optimum Nutrition posee instalaciones de fabricación certificada y utiliza ingredientes que pasan por un estricto control de calidad, hasta terminar en el producto listo para consumir. Además, poseen certificaciones de autenticidad internacionales, que garantizan aún más su excelencia.  *Este producto es un suplemento dietario, no es un medicamento. Suplementa dietas insuficientes. Consulte a su médico y/o farmacéutico..",
    pictureURL: [
      "https://www.farmacialeloir.com.ar/img/articulos/2021/09/ena_whey_x_pro_complex_protein_imagen1.jpg",
      "https://www.farmacialeloir.com.ar/img/articulos/2021/09/ena_whey_x_pro_complex_protein_imagen1.jpg",
    ],
    stock: 7,
    category: "suplementos",
    branch: "ENA Sport",
    rating: 0,
  },
  {
    title: "Platinum Star Nutrition",
    price: 2100.99,
    description:
      "Suplemento desarrollado a base de ultra concentrado de proteína de suero lácteo.Con L - Glutamina, BCAA y Aminoácidos esenciales. Libre de Aspartamo. Posee la más pura proteína de suero micro filtrada a baja temperatura y ultra filtrado para asegurar la más alta calidad, además posee L-Glutamina y Aminoácidos de cadena Ramificada (BCAAs), posee todas las fracciones de la proteína de suero como Beta Lacto globulina, alpha lacto albumina, glicomacropeptidos, inmunoglobulina, lactoferina, serum albúmina y lactoperioxidasa.",
    pictureURL: [
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/835/718/products/whey_banana1-45b82fe9afe35b613f16093600611536-640-0.jpg",
      "https://http2.mlstatic.com/D_NQ_NP_729681-MLA32884191051_112019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_924626-MLA32884396998_112019-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_966972-MLA44462431597_122020-O.webp",
    ],
    rating: 0,
    category: "suplementos",
    branch: "ENA Sport",
    rating: 4.5,
  },
  {
    title: "Zapatillas Under Armour Charged Aurora 2 Running",
    price: 120.99,
    description:
      "Parte superior de malla ligera y tanspirable, platilla de espuma, mediasuela de doble densidadm suela esteriuor de goma.",
    pictureURL: [
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw4fbeb33c/products/UA_3025238-001/UA_3025238-001-1.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw9a898ef7/products/UA_3025238-001/UA_3025238-001-2.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw6d1b04b3/products/UA_3025238-001/UA_3025238-001-3.JPG",
      "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwc1bd45f5/products/UA_3025238-001/UA_3025238-001-4.JPG",
    ],
    stock: 45,
    category: "zapatillas",
    branch: "Aurora",
    rating: 0,
  },
];

export default products;
