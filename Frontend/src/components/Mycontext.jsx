import React, { createContext, useContext, useState } from 'react';

export const Mycontext = createContext();
function MyProvider({ children }) {
  const options = [
    'Reception',
    'Birthday',
    'Anniversary',
    'Vratham',
    'Mehendi',
    'Engagement',
    'Haldi',
    'House Warming',
    'Wedding',
  ];
  const [BookingDetails, setBookingDetails] = useState({
    date: '',
    firstname: '',
    lastname: '',
    selectedEvent: '',
    menu: [],
  });
  const MenuItems = [
    {
      item_name: 'Margherita Pizza',
      cuisine: 'Italian',
      ingredients: ['tomato sauce', 'mozzarella', 'basil', 'olive oil', 'pizza dough'],
      recipe:
        'Spread tomato sauce on the dough, top with mozzarella and basil, then bake until crust is golden.',
      description:
        'Classic Italian pizza with a crisp crust, fresh tomato flavor, and creamy cheese.',
      common_names: ['Cheese Pizza'],
      benefits: ['Vegetarian', 'Good source of calcium'],
      type: 'Main',
      alternate: ['Vegan cheese', 'Gluten-free crust'],
      enum: 'traditional',
      accompanied_food: ['Garlic bread', 'Red wine'],
    },
    {
      item_name: 'Paneer Chatpata',
      cuisine: 'Indian',
      ingredients: ['paneer', 'onions', 'tomatoes', 'chaat masala', 'lemon juice'],
      recipe:
        'Paneer cubes are tossed with onions, tomatoes, and spices like chaat masala and lemon juice for a tangy twist.',
      description: 'A spicy and tangy Indian chaat made with paneer cubes and flavorful spices.',
      common_names: ['Spicy Paneer Chaat'],
      benefits: ['Rich in protein', 'Vegetarian'],
      type: 'Snack',
      alternate: ['Tofu for vegan version'],
      enum: 'non-traditional',
      accompanied_food: ['Mint chutney', 'Sweet chutney'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: paneer, onions, tomatoes, chaat masala | Diet: Vegetarian',
      response:
        'Paneer Chatpata - A spicy Indian chaat featuring cubes of paneer tossed in tangy spices, onions, and tomatoes.',
      dish_name: 'Paneer Chatpata',
    },
    {
      item_name: 'Rawa Dosa',
      cuisine: 'Indian (South)',
      ingredients: [
        'semolina (rawa)',
        'rice flour',
        'yogurt',
        'water',
        'salt',
        'green chili',
        'cumin',
      ],
      recipe:
        'Make a loose batter of semolina, rice flour, yogurt and spices; spread thin on a griddle and cook until golden and crispy.',
      description:
        'A crisp and lacy crepe made from semolina and rice flour, lightly spiced—perfect for breakfast or a snack.',
      common_names: ['Rava Dosa'],
      benefits: ['Quick to prepare', 'Gluten‑free'],
      type: 'Breakfast/Snack',
      alternate: ['Masala rawa dosa', 'Set dosa'],
      enum: 'non-traditional',
      accompanied_food: ['Coconut chutney', 'Sambar'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: semolina, rice flour, yogurt, spices | Diet: Vegetarian',
      response:
        'Rawa Dosa - A crisp, lacy South Indian crepe made from a semolina-rice flour batter, seasoned with spices and served with sambar or chutney.',
      dish_name: 'Rawa Dosa',
    },
    {
      item_name: 'Butter Dosa',
      cuisine: 'Indian (South)',
      ingredients: ['rice', 'urad dal', 'butter', 'salt'],
      recipe:
        'Fermented dosa batter is spread thin on a griddle, baked with butter until crisp and golden.',
      description:
        'A crispy South Indian crepe, generously cooked with butter for a rich and savoury flavour.',
      common_names: ['Butter Dosa'],
      benefits: ['Energy‑rich', 'Gluten‑free'],
      type: 'Breakfast/Snack',
      alternate: ['Ghee dosa', 'Paper dosa'],
      enum: 'non-traditional',
      accompanied_food: ['Sambar', 'Chutney'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: rice, urad dal, butter | Diet: Vegetarian',
      response:
        'Butter Dosa - A crisp South Indian crepe made from fermented batter, cooked with butter and served with chutney and sambar.',
      dish_name: 'Butter Dosa',
    },
    {
      item_name: 'Udikinthoku',
      cuisine: 'Indian (Andhra)',
      ingredients: ['raw mangoes', 'oil', 'red chili powder', 'salt'],
      recipe:
        'Boiled raw mango chunks are tossed with oil, red chili powder and salt, then lightly fermented for a tangy and spicy side.',
      description:
        'A simple yet flavorful Andhra snack of boiled raw mango pieces spiced and ferment‑tinged for tang and heat.',
      common_names: ['Udikinthoku'],
      benefits: ['Probiotic from fermentation', 'Vitamin C'],
      type: 'Snack/Condiment',
      alternate: ['Garlic-infused variant'],
      enum: 'traditional',
      accompanied_food: ['Curd rice', 'Hot rice'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: raw mangoes, oil, chili powder, salt | Diet: Vegetarian',
      response:
        'Udikinthoku - Boiled raw mango pieces spiced with chili and salt, then ferment‑tinged for a tangy Andhra snack or condiment.',
      dish_name: 'Udikinthoku',
    },
    {
      item_name: 'Avakaya (Mango Pickle)',
      cuisine: 'Indian (Andhra)',
      ingredients: [
        'raw mangoes',
        'mustard powder',
        'red chili powder',
        'fenugreek',
        'salt',
        'gingelly oil',
        'garlic',
      ],
      recipe:
        'Cut and sun-dry raw mango pieces, mix with mustard & chili powder, salt, fenugreek & garlic; layer in jars, cover with oil and ferment in sun for days :contentReference[oaicite:1]{index=1}.',
      description:
        'A fiery Andhra-style raw mango pickle, pungent and spicy, made with mustard powder and chili for a year-long shelf life.',
      common_names: ['Avakaya', 'Aavakaaya', 'Mango Pickle'],
      benefits: ['Rich in antioxidants', 'Long shelf life'],
      type: 'Condiment',
      alternate: ['Bellam Avakaya (with jaggery)', 'Garlic-free version'],
      enum: 'traditional',
      accompanied_food: ['Hot rice', 'Curd rice', 'Papad'],
      prompt:
        'Cuisine: Indian | Type: Condiment | Ingredients: raw mangoes, mustard powder, chili powder, oil | Diet: Vegetarian',
      response:
        'Avakaya Mango Pickle - A classic spicy Andhra pickle made by fermenting sun‑dried raw mango pieces in mustard, chili, and oil for a tangy, long‑lasting condiment.',
      dish_name: 'Avakaya (Mango Pickle)',
    },
    {
      item_name: 'Rasam Rice',
      cuisine: 'Indian',
      ingredients: [
        'rice',
        'tomatoes',
        'tamarind',
        'black pepper',
        'cumin',
        'mustard seeds',
        'coriander',
      ],
      recipe:
        'A spicy-sour soup made with tamarind, tomatoes, and spices is poured over rice and served warm, often with ghee.',
      description:
        'A comfort South Indian dish made by mixing rice with tangy, peppery rasam broth.',
      common_names: ['Charu Annam', 'Saaru'],
      benefits: ['Boosts digestion', 'Anti-inflammatory'],
      type: 'Main',
      alternate: ['Lemon rasam rice', 'Garlic rasam rice'],
      enum: 'traditional',
      accompanied_food: ['Papad', 'Potato fry'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: rice, tamarind, tomatoes, spices | Diet: Vegetarian',
      response:
        'Rasam Rice - Rice soaked in a tangy, peppery tamarind broth with Indian spices; a light and warming South Indian meal.',
      dish_name: 'Rasam Rice',
    },
    {
      item_name: 'Sambar Rice',
      cuisine: 'Indian',
      ingredients: ['rice', 'toor dal', 'sambar powder', 'vegetables', 'mustard seeds', 'tamarind'],
      recipe:
        'Cooked rice and lentils are mixed with a tangy sambar made from tamarind and vegetables, then tempered with mustard seeds and curry leaves.',
      description:
        'A nutritious South Indian rice dish combining lentils, tamarind, and vegetables for a comforting meal.',
      common_names: ['Sambar Sadam'],
      benefits: ['Protein-rich', 'Wholesome meal'],
      type: 'Main',
      alternate: ['Millet sambar rice', 'Jain sambar rice'],
      enum: 'traditional',
      accompanied_food: ['Papad', 'Curd', 'Pickle'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: rice, toor dal, vegetables, tamarind, spices | Diet: Vegetarian',
      response:
        'Sambar Rice - A wholesome South Indian meal of rice mixed with lentil-based sambar and seasonal vegetables.',
      dish_name: 'Sambar Rice',
    },
    {
      item_name: 'Butter Naan',
      cuisine: 'Indian',
      ingredients: ['maida (refined flour)', 'yeast', 'milk', 'butter', 'salt'],
      recipe:
        'Soft, leavened dough is rolled and tandoor-cooked until charred, then brushed with butter for a rich finish.',
      description:
        'A soft, fluffy flatbread made from refined flour and finished with butter, served hot with curries.',
      common_names: ['Naan', 'Tandoori Naan'],
      benefits: ['Rich and filling', 'Comfort food'],
      type: 'Bread',
      alternate: ['Garlic naan', 'Whole wheat naan'],
      enum: 'traditional',
      accompanied_food: ['Paneer Butter Masala', 'Dal Makhani'],
      prompt:
        'Cuisine: Indian | Type: Bread | Ingredients: maida, yeast, butter, milk | Diet: Vegetarian',
      response:
        'Butter Naan - A soft, tandoor-baked flatbread brushed with butter, perfect for pairing with rich Indian curries.',
      dish_name: 'Butter Naan',
    },
    {
      item_name: 'Veg Dum Biryani',
      cuisine: 'Indian',
      ingredients: [
        'basmati rice',
        'mixed vegetables',
        'spices',
        'yogurt',
        'saffron',
        'fried onions',
      ],
      recipe:
        'Layered basmati rice and spiced vegetables are slow-cooked (dum) with yogurt, herbs, and saffron for a rich aromatic dish.',
      description:
        'A fragrant and flavorful rice dish made by layering spiced vegetables and rice, then slow-cooked to perfection.',
      common_names: ['Hyderabadi Veg Biryani', 'Dum Pulao'],
      benefits: ['Balanced meal', 'Rich in fiber and flavor'],
      type: 'Main',
      alternate: ['Quinoa biryani', 'Paneer biryani'],
      enum: 'traditional',
      accompanied_food: ['Raita', 'Salad', 'Papad'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: basmati rice, mixed vegetables, yogurt, spices | Diet: Vegetarian',
      response:
        'Veg Dum Biryani - A slow-cooked, aromatic Indian rice dish made with spiced vegetables layered with basmati rice and saffron.',
      dish_name: 'Veg Dum Biryani',
    },
    {
      item_name: 'Jalebi',
      cuisine: 'Indian',
      ingredients: ['maida', 'yogurt', 'sugar syrup', 'saffron', 'ghee'],
      recipe:
        'A fermented batter is piped into spiral shapes, deep-fried in ghee, and dunked in warm saffron sugar syrup.',
      description:
        'A bright orange, crispy and juicy sweet made by deep-frying spirals of batter and soaking in syrup.',
      common_names: ['Jilapi', 'Zalebi'],
      benefits: ['Instant energy', 'Traditionally fermented'],
      type: 'Dessert',
      alternate: ['Stevia syrup', 'Air-fried jalebi'],
      enum: 'traditional',
      accompanied_food: ['Rabri', 'Poha (in MP)'],
      prompt:
        'Cuisine: Indian | Type: Dessert | Ingredients: maida, sugar syrup, saffron, ghee | Diet: Vegetarian',
      response:
        'Jalebi - A crispy, coiled Indian sweet soaked in saffron sugar syrup, often served hot with rabri.',
      dish_name: 'Jalebi',
    },
    {
      item_name: 'Rasgulla',
      cuisine: 'Indian',
      ingredients: ['chhena', 'semolina', 'sugar syrup', 'cardamom'],
      recipe:
        'Chhena (curdled milk solids) is kneaded into soft balls, boiled in sugar syrup until spongy and light.',
      description: 'A spongy, syrupy sweet from Eastern India made from milk curds.',
      common_names: ['Roshogolla', 'Rosogolla'],
      benefits: ['High calcium', 'Gluten-free'],
      type: 'Dessert',
      alternate: ['Stevia syrup version'],
      enum: 'traditional',
      accompanied_food: ['Dry fruits', 'Mishthi doi'],
      prompt:
        'Cuisine: Indian | Type: Dessert | Ingredients: chhena, sugar syrup, cardamom | Diet: Vegetarian',
      response:
        'Rasgulla - Soft, spongy cheese balls soaked in light sugar syrup, a classic Eastern Indian delicacy.',
      dish_name: 'Rasgulla',
    },
    {
      item_name: 'Gulab Jamun',
      cuisine: 'Indian',
      ingredients: ['khoya', 'flour', 'sugar syrup', 'cardamom', 'rose water'],
      recipe:
        'Milk solids (khoya) are kneaded into soft dough, shaped into balls, deep-fried, and soaked in cardamom-rose flavored sugar syrup.',
      description: 'A soft, syrup-soaked Indian dessert made from deep-fried milk solids.',
      common_names: ['Lal Mohan', 'Gulab'],
      benefits: ['Energy rich', 'Festive sweet'],
      type: 'Dessert',
      alternate: ['Bread gulab jamun', 'Milk powder version'],
      enum: 'traditional',
      accompanied_food: ['Rabri', 'Vanilla ice cream'],
      prompt:
        'Cuisine: Indian | Type: Dessert | Ingredients: khoya, sugar syrup, cardamom | Diet: Vegetarian',
      response:
        'Gulab Jamun - Deep-fried milk-solid dumplings soaked in fragrant sugar syrup, this classic Indian dessert is a festival favorite.',
      dish_name: 'Gulab Jamun',
    },
    {
      item_name: 'Curd Rice',
      cuisine: 'Indian',
      ingredients: [
        'rice',
        'curd',
        'mustard seeds',
        'green chili',
        'ginger',
        'curry leaves',
        'salt',
      ],
      recipe:
        'Cooked rice is cooled and mixed with curd and tempered with mustard seeds, green chili, ginger, and curry leaves.',
      description:
        'A cooling and comforting South Indian dish made by mixing curd with cooked rice and seasoned with aromatic spices.',
      common_names: ['Perugu Annam', 'Thayir Sadam'],
      benefits: ['Good for digestion', 'Cooling effect', 'Rich in probiotics'],
      type: 'Main',
      alternate: ['Brown rice version', 'Vegan curd (coconut or almond-based)'],
      enum: 'traditional',
      accompanied_food: ['Pickle', 'Fried chilies', 'Papad'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: rice, curd, mustard seeds, curry leaves, green chili | Diet: Vegetarian',
      response:
        'Curd Rice - A traditional South Indian main dish where curd is mixed into cooked rice and tempered with mustard seeds, green chili, and curry leaves for a refreshing and cooling meal.',
      dish_name: 'Curd Rice',
    },
    {
      item_name: 'Aloo Chaat',
      cuisine: 'Indian',
      ingredients: ['potatoes', 'chaat masala', 'mint chutney', 'lemon juice', 'yogurt'],
      recipe:
        'Fried or roasted potatoes are topped with chutneys, yogurt, and spices for a tangy, flavorful snack.',
      description: 'A spicy North Indian snack made with crisp potatoes and bold seasonings.',
      common_names: ['Spicy Potato Chaat'],
      benefits: ['Energizing', 'Vegetarian'],
      type: 'Snack',
      alternate: ['Air-fried version for low oil'],
      enum: 'traditional',
      accompanied_food: ['Tamarind chutney', 'Chilled buttermilk'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: potatoes, chaat masala, mint chutney, yogurt | Diet: Vegetarian',
      response:
        'Aloo Chaat - A flavorful Indian street snack made with crispy potatoes tossed in chutneys, yogurt, and spices.',
      dish_name: 'Aloo Chaat',
    },
    {
      item_name: 'Pani Puri',
      cuisine: 'Indian',
      ingredients: ['semolina puris', 'spiced water', 'potatoes', 'chickpeas', 'tamarind chutney'],
      recipe: 'Hollow puris are filled with a spicy potato mix and dipped in flavored tangy water.',
      description:
        'A popular Indian street food where hollow puris are filled with spicy, tangy water and fillings.',
      common_names: ['Golgappa', 'Puchka'],
      benefits: ['Light snack', 'Vegan'],
      type: 'Snack',
      alternate: ['Sprouted moong instead of potato'],
      enum: 'traditional',
      accompanied_food: ['Sweet chutney shots'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: semolina puris, potatoes, spiced water, tamarind | Diet: Vegan',
      response:
        'Pani Puri - Hollow, crispy puris filled with spicy mashed potatoes and dipped in tangy flavored water.',
      dish_name: 'Pani Puri',
    },
    {
      item_name: 'Bhel Puri',
      cuisine: 'Indian',
      ingredients: ['puffed rice', 'sev', 'onions', 'tomatoes', 'tamarind chutney'],
      recipe:
        'Mix puffed rice with onions, tomatoes, chutneys, and sev for a crunchy, spicy chaat.',
      description: 'A light and tangy Indian street food made from puffed rice and chutneys.',
      common_names: ['Bhel', 'Chaat Mix'],
      benefits: ['Low calorie', 'Vegan'],
      type: 'Snack',
      alternate: ['Add sprouts for protein'],
      enum: 'traditional',
      accompanied_food: ['Masala chai'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: puffed rice, sev, onions, tamarind chutney | Diet: Vegan',
      response:
        'Bhel Puri - A crunchy Indian street snack made with puffed rice, chopped veggies, tangy chutneys, and sev.',
      dish_name: 'Bhel Puri',
    },
    {
      item_name: 'Paneer Tikka',
      cuisine: 'Indian',
      ingredients: ['paneer', 'yogurt', 'spices', 'capsicum', 'onion'],
      recipe:
        'Paneer cubes are marinated in spiced yogurt and grilled with bell peppers and onions.',
      description: 'A popular tandoori snack made with marinated and grilled paneer.',
      common_names: ['Grilled Paneer'],
      benefits: ['High protein', 'Gluten-free'],
      type: 'Appetizer',
      alternate: ['Tofu tikka'],
      enum: 'traditional',
      accompanied_food: ['Green chutney', 'Lemon wedges'],
      prompt:
        'Cuisine: Indian | Type: Appetizer | Ingredients: paneer, yogurt, spices, capsicum | Diet: Vegetarian',
      response:
        'Paneer Tikka - A traditional Indian appetizer of paneer cubes marinated in spiced yogurt and grilled to perfection.',
      dish_name: 'Paneer Tikka',
    },
    {
      item_name: 'Mix Veg',
      cuisine: 'Indian',
      ingredients: ['assorted vegetables', 'onion', 'tomato', 'spices', 'oil'],
      recipe:
        'Cook assorted vegetables with onions, tomatoes, and spices until tender; can be made as a gravy or dry sabzi.',
      description: 'A colorful and nutritious curry made with mixed vegetables and Indian spices.',
      common_names: ['Mixed Vegetable Curry', 'Veg Sabzi'],
      benefits: ['High in fiber & antioxidants', 'Contains vitamins and minerals'],
      type: 'Main',
      alternate: ['Add paneer', 'Mixed veg pulao'],
      enum: 'traditional',
      accompanied_food: ['Roti', 'Rice'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: mixed vegetables, spices | Diet: Vegetarian',
      response:
        'Mix Veg - A healthy Indian vegetable curry made with assorted veggies cooked in a flavorful onion-tomato spice base.',
      dish_name: 'Mix Veg',
    },
    {
      item_name: 'Chole',
      cuisine: 'Indian',
      ingredients: ['chickpeas', 'onions', 'tomatoes', 'ginger', 'garam masala', 'spices'],
      recipe:
        'Cook soaked chickpeas in a spicy onion-tomato gravy seasoned with ginger, garlic, and masalas until thick and flavorful.',
      description: 'A rich and spicy chickpea curry popular in North India.',
      common_names: ['Chana Masala'],
      benefits: ['High in plant‑based protein & fiber', 'Low glycemic'],
      type: 'Main',
      alternate: ['Jain chole', 'Kala chana'],
      enum: 'traditional',
      accompanied_food: ['Bhature', 'Roti', 'Rice'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: chickpeas, tomatoes, spices | Diet: Vegetarian',
      response:
        'Chole - A hearty North Indian chickpea curry cooked in a fragrant spiced tomato-onion gravy, best enjoyed with bhature or rice.',
      dish_name: 'Chole',
    },
    {
      item_name: 'Mirchi Bajji',
      cuisine: 'Indian',
      ingredients: ['large green chilies', 'gram flour', 'spices', 'oil'],
      recipe:
        'Stuff or slit large chilies, dip in seasoned gram flour batter, and deep-fry until crispy.',
      description:
        'A hot and crispy snack of batter-fried green chilies, typically served sideways with tea.',
      common_names: ['Mirapakaya Bajji', 'Mirchi Bada'],
      benefits: ['Boosts metabolism (capsaicin)', 'Source of vitamin C'],
      type: 'Snack',
      alternate: ['Baked bajji', 'Stuffed bajji'],
      enum: 'traditional',
      accompanied_food: ['Mint chutney', 'Tamarind chutney'],
      prompt:
        'Cuisine: Indian | Type: Snack | Ingredients: green chilies, gram flour, oil | Diet: Vegetarian',
      response:
        'Mirchi Bajji - Large green chilies dipped in gram flour batter and deep-fried until crispy; a spicy Indian street snack best served with chutney.',
      dish_name: 'Mirchi Bajji',
    },
    {
      item_name: 'Pav Bhaji',
      cuisine: 'Indian (Maharashtra)',
      ingredients: ['mixed vegetables', 'potatoes', 'tomatoes', 'pav bhaji masala', 'bread rolls'],
      recipe:
        'Mash and cook mixed vegetables with spices. Serve hot with buttered toasted pav (bread rolls) and lemon wedges.',
      description:
        'A thick, spicy vegetable mash served with buttered buns — a Mumbai street food classic.',
      common_names: ['Bhaji‑Pav'],
      benefits: ['Vegetable-rich', 'Spiced for digestion'],
      type: 'Main/Snack',
      alternate: ['Green pav bhaji', 'Jain pav bhaji'],
      enum: 'traditional',
      accompanied_food: ['Chopped onions', 'Lemon wedges'],
      prompt:
        'Cuisine: Indian | Type: Main | Ingredients: mixed vegetables, pav bhaji masala, bread | Diet: Vegetarian',
      response:
        'Pav Bhaji - A hearty Mumbai street food of spiced mashed vegetables served with buttered pav, garnished with onions and served hot.',
      dish_name: 'Pav Bhaji',
    },
    {
      item_name: 'Roti',
      cuisine: 'Indian',
      ingredients: ['whole wheat flour', 'water', 'salt'],
      recipe:
        'Knead a soft dough of flour, water, and salt. Roll into thin circles and cook on a hot griddle until light brown spots appear.',
      description: 'Soft, unleavened whole wheat flatbread commonly eaten with curries.',
      common_names: ['Chapati'],
      benefits: ['High fiber', 'Low fat'],
      type: 'Bread',
      alternate: ['Phulka', 'Tawa Roti'],
      enum: 'traditional',
      accompanied_food: ['Dal', 'Sabzi', 'Yogurt'],
      prompt:
        'Cuisine: Indian | Type: Bread | Ingredients: whole wheat flour, water | Diet: Vegetarian',
      response:
        'Roti - A soft, whole wheat flatbread cooked on a griddle, typically served with lentils or vegetable curries.',
      dish_name: 'Roti',
    },
    {
      item_name: 'Puri',
      cuisine: 'Indian',
      ingredients: ['whole wheat flour', 'water', 'salt', 'oil'],
      recipe:
        'Knead a firm dough of flour, salt, and water. Roll into small circles and deep-fry until golden and puffed.',
      description: 'Soft, puffy deep-fried flatbreads made from whole wheat flour.',
      common_names: ['Poori'],
      benefits: ['Comfort food', 'Energy-rich'],
      type: 'Bread/Snack',
      alternate: ['Krishna Puri', 'Masala Puri'],
      enum: 'traditional',
      accompanied_food: ['Aloo Bhaji', 'Pickle', 'Curd'],
      prompt:
        'Cuisine: Indian | Type: Bread | Ingredients: whole wheat flour, oil | Diet: Vegetarian',
      response:
        'Puri - Soft, round deep-fried flatbreads made from whole wheat flour, typically served with spicy potato curry and pickle.',
      dish_name: 'Puri',
    },
  ];

  return (
    <>
      <Mycontext.Provider value={{ options, BookingDetails, setBookingDetails,MenuItems}}>
        {children}
      </Mycontext.Provider>
    </>
  );
}

export default MyProvider;
