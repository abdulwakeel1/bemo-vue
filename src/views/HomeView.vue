<template>
  <div>
    <div class="container">
      <div v-for="(column, index) in columns" :data-column-id="column.id" :key="index" class="column">
        <div class="column-title">
          {{ column.title }}
          <button @click="deleteColumn(column.id)" class="delete-column-button">Delete</button>
        </div>
        <!-- <div v-for="(card, cardIndex) in column.cards" :key="cardIndex" class="card-area">
          {{ card.title }}
          <button @click="openModal(card)">Edit</button>
        </div> -->


        <draggable v-model="column.cards" 
                   group="cards" 
                   animation="150"
                   v-on:end="handleDrop"
        >
          <div class="card-area" 
               v-for="(card, cardIndex) in column.cards" 
               :key="cardIndex" 
               :data-card-id="card.id" 
               :data-column-id="column.id"
               @click="openModal(card)"
          >
            {{ card.title }}
          </div>
        </draggable>
        
        <button @click="addCard(column.id)" class="add-card-button">Add Card</button>
      </div>
      <button @click="addColumn" class="add-column-button">Add Column</button>

      <modal name="ticket-modal" v-if="showModal" @close="showModal = false">
        <h3>{{ currentCard.title }}</h3>
        <p>{{ currentCard.description }}</p>
        <input v-model="currentCard.title" placeholder="Title" />
        <textarea v-model="currentCard.description" placeholder="Description"></textarea>
      </modal>
    </div>
  </div>
  
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  components: {
    draggable
  },
  data() {
    return {
      columns: [],
      showModal: false,
      currentCard: {},
    };
  },
  mounted() {
    this.loadColumns()
  },
  methods: {
    async loadColumns() {
      try {
        const response = await axios.get('https://bemo.laravelai.com/api/columns')
        this.columns = response.data
      } catch (error) {
        console.error(error)
      }
    },
    addColumn() {
      try {
        const response = axios.post('https://bemo.laravelai.com/api/columns/create')
        this.loadColumns()
      } catch (error) {
        console.error(error)
      }
    },
    async addCard(columnId) {
      try {
        await axios.post('https://bemo.laravelai.com/api/card/create', {columnId: columnId})
        this.loadColumns()
      } catch (error) {
        console.error(error)
      }
    },
    async deleteColumn(columnId) {
      try {

        await axios.delete('https://bemo.laravelai.com/api/columns/'+ columnId +'/delete')
        this.loadColumns()
      } catch (error) {
        console.error(error)
      }
    },
    openModal(card) {
      this.currentCard = card;
      this.showModal = true;
    },
    async handleDrop(event) {
      const column = event.to
      const cardId = event.item.dataset.cardId
      const columnId = column.parentElement.dataset.columnId
      const cardElements = column.querySelectorAll('.card-area')
      const cardIds = [...cardElements].map(card => card.dataset.cardId)
      
      await axios.post('https://bemo.laravelai.com/api/card/move', {columnId: columnId, cardId: cardId, cardIds: cardIds})

    }
  },
};
</script>

<style>
  .container {
      display: flex;
      /* flex-wrap: wrap; */
  }
  .column {
      width: 250px;
      margin: 10px;
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 20px;
  }
  .column-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
  }
  .delete-column-button {
      background-color: #f44336; /* Red */
      color: white;
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-left: auto;
  }
  .delete-column-button:hover {
      background-color: #cc0000;
  }
  .delete-column-button {
      transition: background-color 0.3s ease-in-out;
  }
  .card-area {
      background-color: white;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
  }
  .card-area:hover {
      /* background-color: #f5f5f5; */
      transform: scale(1.1);
  }
  .add-card-button {
    background-color: #4CAF50; /* Green */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  .add-card-button:hover {
      background-color: #3e8e41;
      transition: background-color 0.3s ease-in-out;
  }
  .add-column-button {
      margin-left: auto;
      margin: 10px;
      width: 250px;
      height: 35px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
  }

  .add-column-button:hover {
      background-color: #e9eeea;
      transition: background-color 0.3s ease-in-out;
  }

  

</style>