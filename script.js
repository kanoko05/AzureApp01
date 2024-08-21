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
        snackbar: false, // 申込み完了メッセージ表示用の状態
        places: [],
        filteredBookings: [], // フィルタリングされた予約データ
 　　　 searchName: '', // 名前検索用のデータ
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
            // 検索結果から名前が一致するデータをフィルタリング
            this.filteredBookings = response.data.List.filter(booking => booking.name === this.searchName);
          } catch (error) {
            console.error("Error searching by name:", error);
            this.filteredBookings = []; // エラーが発生した場合は結果をクリア
          }
        },   
       
        
        
        
        
        async submitForm() {
          this.submit();
          this.snackbar = true;
          
        },
          
          
        async submit() {
          try {
            const selectedPlan = this.places.find(place => place.planitem === this.Planid);
            const param = {
              Name: this.Name,
              Email: this.Email,
              Planid: selectedPlan ? selectedPlan.plan_id : null
            };

            const response = await axios.post('https://m3h-saito-functionapi.azurewebsites.net/api/INSERT', param);
            console.log(response.data);
          } catch (error) {
            console.error(error);
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