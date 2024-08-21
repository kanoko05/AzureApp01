new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    tab: 0,
    model: 0,
    Name: '',
    Email: '',
    Planid: '',
    checkbox: false,
    nameErrors: [],
    emailErrors: [],
    checkboxErrors: [],
    snackbar: false,
    places: [],
    filteredBookings: [],
    searchName: '',
    images: [
      'https://i.gyazo.com/8309d3a9305278c73c181e3612fb520c.jpg',
      'https://i.gyazo.com/b0f16b3b3296858000b57dbc5f333415.jpg',
      'https://i.gyazo.com/d81a66187af82f3f4eba61250a803392.jpg',
      'https://i.gyazo.com/fa3f56ef328e7bea421b6a17c36a454a.jpg',
      'https://i.gyazo.com/3136000a3c1cf2d84c53efda41670b14.jpg'
    ],
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: '旅行先', value: 'planitem' },
      { text: '詳細', value: 'contents' },
      { text: '価格', value: 'price' },
    ],
  }),
  computed: {
  selectedDetails() {
    return this.places.find(place => place.planitem === this.Planid) || {};
  }
},
  created() {
    this.fetchPlanItems();
  },
  methods: {
    
    blur() {
    console.log(this.Email); // このログが undefined でないことを確認
  },
    
    
    async fetchPlanItems() {
      try {
        const response = await axios.get('https://m3h-saito-functionapi.azurewebsites.net/api/SELECT');
        console.log("Fetched data:", response.data);
        this.places = response.data.List;
      } catch (error) {
        console.error("Error fetching plan items:", error);
      }
    },
    
   async searchByName() {
  try {
    const response = await axios.post('https://m3h-saito-functionapi.azurewebsites.net/api/ExecuteFunction', { name: this.searchName });
    console.log("Search results:", response.data);
    this.filteredBookings = response.data.List.filter(booking => booking.name === this.searchName);
  } catch (error) {
    console.error("Error searching by name:", error);
    this.filteredBookings = [];
    this.snackbar = true; // エラー時に Snackbar を表示
  }
},

   async submitForm() {
  if (!this.checkbox) {
    this.checkboxErrors.push("チェックボックスにチェックを入れてください。");
    this.snackbar = true; // Snackbarを表示
    return;
  }
  // チェックが入っている場合の処理
  await this.submit(); // ここで await を追加
  this.snackbar = true;
},
    
    async submit() {
  try {
    const selectedPlan = this.places.find(place => place.planitem === this.Planid);
    if (!selectedPlan) {
      console.error("Selected plan not found.");
      return;
    }
    const param = {
      Name: this.Name,
      Email: this.Email,
      Planid: selectedPlan.plan_id
    };

    const response = await axios.post('https://m3h-saito-functionapi.azurewebsites.net/api/INSERT', param);
    console.log(response.data);
  } catch (error) {
    console.error("Error submitting form:", error);
    this.snackbar = true; // エラー時に Snackbar を表示
  }
},
    
    clear() {
      this.Name = '';
      this.Email = '';
      this.Planid = '';
      this.checkbox = false;
    }
  }
});