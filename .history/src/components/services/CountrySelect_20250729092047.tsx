import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

type Props = {
  value: string;
  onValueChange: (val: string) => void;
};

const allCountries: CountryOption[] = [
  { value: "AW", label: "Aruba", flag: "🇦🇼" },
  { value: "AF", label: "Afghanistan", flag: "🇦🇫" },
  { value: "AO", label: "Angola", flag: "🇦🇴" },
  { value: "AI", label: "Anguilla", flag: "🇦🇮" },
  { value: "AX", label: "Åland Islands", flag: "🇦🇽" },
  { value: "AL", label: "Albania", flag: "🇦🇱" },
  { value: "AD", label: "Andorra", flag: "🇦🇩" },
  { value: "AE", label: "United Arab Emirates", flag: "🇦🇪" },
  { value: "AR", label: "Argentina", flag: "🇦🇷" },
  { value: "AM", label: "Armenia", flag: "🇦🇲" },
  { value: "AS", label: "American Samoa", flag: "🇦🇸" },
  { value: "AQ", label: "Antarctica", flag: "🇦🇶" },
  { value: "TF", label: "French Southern Territories", flag: "🇹🇫" },
  { value: "AG", label: "Antigua and Barbuda", flag: "🇦🇬" },
  { value: "AU", label: "Australia", flag: "🇦🇺" },
  { value: "AT", label: "Austria", flag: "🇦🇹" },
  { value: "AZ", label: "Azerbaijan", flag: "🇦🇿" },
  { value: "BI", label: "Burundi", flag: "🇧🇮" },
  { value: "BE", label: "Belgium", flag: "🇧🇪" },
  { value: "BJ", label: "Benin", flag: "🇧🇯" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba", flag: "🇧🇶" },
  { value: "BF", label: "Burkina Faso", flag: "🇧🇫" },
  { value: "BD", label: "Bangladesh", flag: "🇧🇩" },
  { value: "BG", label: "Bulgaria", flag: "🇧🇬" },
  { value: "BH", label: "Bahrain", flag: "🇧🇭" },
  { value: "BS", label: "Bahamas", flag: "🇧🇸" },
  { value: "BA", label: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { value: "BL", label: "Saint Barthélemy", flag: "🇧🇱" },
  { value: "BY", label: "Belarus", flag: "🇧🇾" },
  { value: "BZ", label: "Belize", flag: "🇧🇿" },
  { value: "BM", label: "Bermuda", flag: "🇧🇲" },
  { value: "BO", label: "Bolivia, Plurinational State of", flag: "🇧🇴" },
  { value: "BR", label: "Brazil", flag: "🇧🇷" },
  { value: "BB", label: "Barbados", flag: "🇧🇧" },
  { value: "BN", label: "Brunei Darussalam", flag: "🇧🇳" },
  { value: "BT", label: "Bhutan", flag: "🇧🇹" },
  { value: "BV", label: "Bouvet Island", flag: "🇧🇻" },
  { value: "BW", label: "Botswana", flag: "🇧🇼" },
  { value: "CF", label: "Central African Republic", flag: "🇨🇫" },
  { value: "CA", label: "Canada", flag: "🇨🇦" },
  { value: "CC", label: "Cocos (Keeling) Islands", flag: "🇨🇨" },
  { value: "CH", label: "Switzerland", flag: "🇨🇭" },
  { value: "CL", label: "Chile", flag: "🇨🇱" },
  { value: "CN", label: "China", flag: "🇨🇳" },
  { value: "CI", label: "Côte d'Ivoire", flag: "🇨🇮" },
  { value: "CM", label: "Cameroon", flag: "🇨🇲" },
  { value: "CD", label: "Congo, The Democratic Republic of the", flag: "🇨🇩" },
  { value: "CG", label: "Congo", flag: "🇨🇬" },
  { value: "CK", label: "Cook Islands", flag: "🇨🇰" },
  { value: "CO", label: "Colombia", flag: "🇨🇴" },
  { value: "KM", label: "Comoros", flag: "🇰🇲" },
  { value: "CV", label: "Cabo Verde", flag: "🇨🇻" },
  { value: "CR", label: "Costa Rica", flag: "🇨🇷" },
  { value: "CU", label: "Cuba", flag: "🇨🇺" },
  { value: "CW", label: "Curaçao", flag: "🇨🇼" },
  { value: "CX", label: "Christmas Island", flag: "🇨🇽" },
  { value: "KY", label: "Cayman Islands", flag: "🇰🇾" },
  { value: "CY", label: "Cyprus", flag: "🇨🇾" },
  { value: "CZ", label: "Czechia", flag: "🇨🇿" },
  { value: "DE", label: "Germany", flag: "🇩🇪" },
  { value: "DJ", label: "Djibouti", flag: "🇩🇯" },
  { value: "DM", label: "Dominica", flag: "🇩🇲" },
  { value: "DK", label: "Denmark", flag: "🇩🇰" },
  { value: "DO", label: "Dominican Republic", flag: "🇩🇴" },
  { value: "DZ", label: "Algeria", flag: "🇩🇿" },
  { value: "EC", label: "Ecuador", flag: "🇪🇨" },
  { value: "EG", label: "Egypt", flag: "🇪🇬" },
  { value: "ER", label: "Eritrea", flag: "🇪🇷" },
  { value: "EH", label: "Western Sahara", flag: "🇪🇭" },
  { value: "ES", label: "Spain", flag: "🇪🇸" },
  { value: "EE", label: "Estonia", flag: "🇪🇪" },
  { value: "ET", label: "Ethiopia", flag: "🇪🇹" },
  { value: "FI", label: "Finland", flag: "🇫🇮" },
  { value: "FJ", label: "Fiji", flag: "🇫🇯" },
  { value: "FK", label: "Falkland Islands (Malvinas)", flag: "🇫🇰" },
  { value: "FR", label: "France", flag: "🇫🇷" },
  { value: "FO", label: "Faroe Islands", flag: "🇫🇴" },
  { value: "FM", label: "Micronesia, Federated States of", flag: "🇫🇲" },
  { value: "GA", label: "Gabon", flag: "🇬🇦" },
  { value: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { value: "GE", label: "Georgia", flag: "🇬🇪" },
  { value: "GG", label: "Guernsey", flag: "🇬🇬" },
  { value: "GH", label: "Ghana", flag: "🇬🇭" },
  { value: "GI", label: "Gibraltar", flag: "🇬🇮" },
  { value: "GN", label: "Guinea", flag: "🇬🇳" },
  { value: "GP", label: "Guadeloupe", flag: "🇬🇵" },
  { value: "GM", label: "Gambia", flag: "🇬🇲" },
  { value: "GW", label: "Guinea-Bissau", flag: "🇬🇼" },
  { value: "GQ", label: "Equatorial Guinea", flag: "🇬🇶" },
  { value: "GR", label: "Greece", flag: "🇬🇷" },
  { value: "GD", label: "Grenada", flag: "🇬🇩" },
  { value: "GL", label: "Greenland", flag: "🇬🇱" },
  { value: "GT", label: "Guatemala", flag: "🇬🇹" },
  { value: "GF", label: "French Guiana", flag: "🇬🇫" },
  { value: "GU", label: "Guam", flag: "🇬🇺" },
  { value: "GY", label: "Guyana", flag: "🇬🇾" },
  { value: "HK", label: "Hong Kong", flag: "🇭🇰" },
  { value: "HM", label: "Heard Island and McDonald Islands", flag: "🇭🇲" },
  { value: "HN", label: "Honduras", flag: "🇭🇳" },
  { value: "HR", label: "Croatia", flag: "🇭🇷" },
  { value: "HT", label: "Haiti", flag: "🇭🇹" },
  { value: "HU", label: "Hungary", flag: "🇭🇺" },
  { value: "ID", label: "Indonesia", flag: "🇮🇩" },
  { value: "IM", label: "Isle of Man", flag: "🇮🇲" },
  { value: "IN", label: "India", flag: "🇮🇳" },
  { value: "IO", label: "British Indian Ocean Territory", flag: "🇮🇴" },
  { value: "IE", label: "Ireland", flag: "🇮🇪" },
  { value: "IR", label: "Iran, Islamic Republic of", flag: "🇮🇷" },
  { value: "IQ", label: "Iraq", flag: "🇮🇶" },
  { value: "IS", label: "Iceland", flag: "🇮🇸" },
  { value: "IL", label: "Israel", flag: "🇮🇱" },
  { value: "IT", label: "Italy", flag: "🇮🇹" },
  { value: "JM", label: "Jamaica", flag: "🇯🇲" },
  { value: "JE", label: "Jersey", flag: "🇯🇪" },
  { value: "JO", label: "Jordan", flag: "🇯🇴" },
  { value: "JP", label: "Japan", flag: "🇯🇵" },
  { value: "KZ", label: "Kazakhstan", flag: "🇰🇿" },
  { value: "KE", label: "Kenya", flag: "🇰🇪" },
  { value: "KG", label: "Kyrgyzstan", flag: "🇰🇬" },
  { value: "KH", label: "Cambodia", flag: "🇰🇭" },
  { value: "KI", label: "Kiribati", flag: "🇰🇮" },
  { value: "KN", label: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { value: "KR", label: "Korea, Republic of", flag: "🇰🇷" },
  { value: "KW", label: "Kuwait", flag: "🇰🇼" },
  { value: "LA", label: "Lao People's Democratic Republic", flag: "🇱🇦" },
  { value: "LB", label: "Lebanon", flag: "🇱🇧" },
  { value: "LR", label: "Liberia", flag: "🇱🇷" },
  { value: "LY", label: "Libya", flag: "🇱🇾" },
  { value: "LC", label: "Saint Lucia", flag: "🇱🇨" },
  { value: "LI", label: "Liechtenstein", flag: "🇱🇮" },
  { value: "LK", label: "Sri Lanka", flag: "🇱🇰" },
  { value: "LS", label: "Lesotho", flag: "🇱🇸" },
  { value: "LT", label: "Lithuania", flag: "🇱🇹" },
  { value: "LU", label: "Luxembourg", flag: "🇱🇺" },
  { value: "LV", label: "Latvia", flag: "🇱🇻" },
  { value: "MO", label: "Macao", flag: "🇲🇴" },
  { value: "MF", label: "Saint Martin (French part)", flag: "🇲🇫" },
  { value: "MA", label: "Morocco", flag: "🇲🇦" },
  { value: "MC", label: "Monaco", flag: "🇲🇨" },
  { value: "MD", label: "Moldova, Republic of", flag: "🇲🇩" },
  { value: "MG", label: "Madagascar", flag: "🇲🇬" },
  { value: "MV", label: "Maldives", flag: "🇲🇻" },
  { value: "MX", label: "Mexico", flag: "🇲🇽" },
  { value: "MH", label: "Marshall Islands", flag: "🇲🇭" },
  { value: "MK", label: "North Macedonia", flag: "🇲🇰" },
  { value: "ML", label: "Mali", flag: "🇲🇱" },
  { value: "MT", label: "Malta", flag: "🇲🇹" },
  { value: "MM", label: "Myanmar", flag: "🇲🇲" },
  { value: "ME", label: "Montenegro", flag: "🇲🇪" },
  { value: "MN", label: "Mongolia", flag: "🇲🇳" },
  { value: "MP", label: "Northern Mariana Islands", flag: "🇲🇵" },
  { value: "MZ", label: "Mozambique", flag: "🇲🇿" },
  { value: "MR", label: "Mauritania", flag: "🇲🇷" },
  { value: "MS", label: "Montserrat", flag: "🇲🇸" },
  { value: "MQ", label: "Martinique", flag: "🇲🇶" },
  { value: "MU", label: "Mauritius", flag: "🇲🇺" },
  { value: "MW", label: "Malawi", flag: "🇲🇼" },
  { value: "MY", label: "Malaysia", flag: "🇲🇾" },
  { value: "YT", label: "Mayotte", flag: "🇾🇹" },
  { value: "NA", label: "Namibia", flag: "🇳🇦" },
  { value: "NC", label: "New Caledonia", flag: "🇳🇨" },
  { value: "NE", label: "Niger", flag: "🇳🇪" },
  { value: "NF", label: "Norfolk Island", flag: "🇳🇫" },
  { value: "NG", label: "Nigeria", flag: "🇳🇬" },
  { value: "NI", label: "Nicaragua", flag: "🇳🇮" },
  { value: "NU", label: "Niue", flag: "🇳🇺" },
  { value: "NL", label: "Netherlands", flag: "🇳🇱" },
  { value: "NO", label: "Norway", flag: "🇳🇴" },
  { value: "NP", label: "Nepal", flag: "🇳🇵" },
  { value: "NR", label: "Nauru", flag: "🇳🇷" },
  { value: "NZ", label: "New Zealand", flag: "🇳🇿" },
  { value: "OM", label: "Oman", flag: "🇴🇲" },
  { value: "PK", label: "Pakistan", flag: "🇵🇰" },
  { value: "PA", label: "Panama", flag: "🇵🇦" },
  { value: "PN", label: "Pitcairn", flag: "🇵🇳" },
  { value: "PE", label: "Peru", flag: "🇵🇪" },
  { value: "PH", label: "Philippines", flag: "🇵🇭" },
  { value: "PW", label: "Palau", flag: "🇵🇼" },
  { value: "PG", label: "Papua New Guinea", flag: "🇵🇬" },
  { value: "PL", label: "Poland", flag: "🇵🇱" },
  { value: "PR", label: "Puerto Rico", flag: "🇵🇷" },
  { value: "KP", label: "Korea, Democratic People's Republic of", flag: "🇰🇵" },
  { value: "PT", label: "Portugal", flag: "🇵🇹" },
  { value: "PY", label: "Paraguay", flag: "🇵🇾" },
  { value: "PS", label: "Palestine, State of", flag: "🇵🇸" },
  { value: "PF", label: "French Polynesia", flag: "🇵🇫" },
  { value: "QA", label: "Qatar", flag: "🇶🇦" },
  { value: "RE", label: "Réunion", flag: "🇷🇪" },
  { value: "RO", label: "Romania", flag: "🇷🇴" },
  { value: "RU", label: "Russian Federation", flag: "🇷🇺" },
  { value: "RW", label: "Rwanda", flag: "🇷🇼" },
  { value: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
  { value: "SD", label: "Sudan", flag: "🇸🇩" },
  { value: "SN", label: "Senegal", flag: "🇸🇳" },
  { value: "SG", label: "Singapore", flag: "🇸🇬" },
  {
    value: "GS",
    label: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
  },
  {
    value: "SH",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    flag: "🇸🇭",
  },
  { value: "SJ", label: "Svalbard and Jan Mayen", flag: "🇸🇯" },
  { value: "SB", label: "Solomon Islands", flag: "🇸🇧" },
  { value: "SL", label: "Sierra Leone", flag: "🇸🇱" },
  { value: "SV", label: "El Salvador", flag: "🇸🇻" },
  { value: "SM", label: "San Marino", flag: "🇸🇲" },
  { value: "SO", label: "Somalia", flag: "🇸🇴" },
  { value: "PM", label: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  { value: "RS", label: "Serbia", flag: "🇷🇸" },
  { value: "SS", label: "South Sudan", flag: "🇸🇸" },
  { value: "ST", label: "Sao Tome and Principe", flag: "🇸🇹" },
  { value: "SR", label: "Suriname", flag: "🇸🇷" },
  { value: "SK", label: "Slovakia", flag: "🇸🇰" },
  { value: "SI", label: "Slovenia", flag: "🇸🇮" },
  { value: "SE", label: "Sweden", flag: "🇸🇪" },
  { value: "SZ", label: "Eswatini", flag: "🇸🇿" },
  { value: "SX", label: "Sint Maarten (Dutch part)", flag: "🇸🇽" },
  { value: "SC", label: "Seychelles", flag: "🇸🇨" },
  { value: "SY", label: "Syrian Arab Republic", flag: "🇸🇾" },
  { value: "TC", label: "Turks and Caicos Islands", flag: "🇹🇨" },
  { value: "TD", label: "Chad", flag: "🇹🇩" },
  { value: "TG", label: "Togo", flag: "🇹🇬" },
  { value: "TH", label: "Thailand", flag: "🇹🇭" },
  { value: "TJ", label: "Tajikistan", flag: "🇹🇯" },
  { value: "TK", label: "Tokelau", flag: "🇹🇰" },
  { value: "TM", label: "Turkmenistan", flag: "🇹🇲" },
  { value: "TL", label: "Timor-Leste", flag: "🇹🇱" },
  { value: "TO", label: "Tonga", flag: "🇹🇴" },
  { value: "TT", label: "Trinidad and Tobago", flag: "🇹🇹" },
  { value: "TN", label: "Tunisia", flag: "🇹🇳" },
  { value: "TR", label: "Turkey", flag: "🇹🇷" },
  { value: "TV", label: "Tuvalu", flag: "🇹🇻" },
  { value: "TW", label: "Taiwan, Province of China", flag: "🇹🇼" },
  { value: "TZ", label: "Tanzania, United Republic of", flag: "🇹🇿" },
  { value: "UG", label: "Uganda", flag: "🇺🇬" },
  { value: "UA", label: "Ukraine", flag: "🇺🇦" },
  { value: "UM", label: "United States Minor Outlying Islands", flag: "🇺🇲" },
  { value: "UY", label: "Uruguay", flag: "🇺🇾" },
  { value: "US", label: "United States", flag: "🇺🇸" },
  { value: "UZ", label: "Uzbekistan", flag: "🇺🇿" },
  { value: "VA", label: "Holy See (Vatican City State)", flag: "🇻🇦" },
  { value: "VC", label: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { value: "VE", label: "Venezuela, Bolivarian Republic of", flag: "🇻🇪" },
  { value: "VG", label: "Virgin Islands, British", flag: "🇻🇬" },
  { value: "VI", label: "Virgin Islands, U.S.", flag: "🇻🇮" },
  { value: "VN", label: "Viet Nam", flag: "🇻🇳" },
  { value: "VU", label: "Vanuatu", flag: "🇻🇺" },
  { value: "WF", label: "Wallis and Futuna", flag: "🇼🇫" },
  { value: "WS", label: "Samoa", flag: "🇼🇸" },
  { value: "YE", label: "Yemen", flag: "🇾🇪" },
  { value: "ZA", label: "South Africa", flag: "🇿🇦" },
  { value: "ZM", label: "Zambia", flag: "🇿🇲" },
  { value: "ZW", label: "Zimbabwe", flag: "🇿🇼" },
];

const CountrySelect = ({ value, onValueChange }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);

  useEffect(() => {
    setFilteredCountries(
      allCountries.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const selected = allCountries.find((c) => c.value === value);
  const displayLabel = selected
    ? `${selected.flag} ${selected.label}`
    : "Sélectionnez un pays";

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
    setSearch("");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={value ? styles.selectText : styles.placeholder}>
          {displayLabel}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSearch("");
        }}
      >
        <Pressable
          style={styles.backdrop}
          onPressOut={() => {
            setModalVisible(false);
            setSearch("");
          }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisissez un pays</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.itemText}>
                    {item.flag} {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: "#5cb9bc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    fontSize: 16,
    color: "#9ca3af",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
});

export default CountrySelect;
