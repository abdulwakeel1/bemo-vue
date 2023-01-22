<template>
    <div class="column">
        <h2>{{ title }}</h2>
        <button @click="deleteColumn">Delete</button>
        <column
            v-for="(column, index) in columns"
            :key="index"
            :title="column.title"
            :columnId="column.id"
            :cards="cards"
            @delete-column="deleteColumn"
            @card-dragged="handleCardDrag"
        ></column>
    </div>
</template>
  
  <script>
  import Card from './Card.vue'
  
  export default {
    components: {
      Card
    },
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        cards:  [
            { id: 1, columnId: 1, title: 'Card 1', description: 'Description 1' },
            { id: 2, columnId: 1, title: 'Card 2', description: 'Description 2' },
            { id: 3, columnId: 2, title: 'Card 3', description: 'Description 3' },
            { id: 4, columnId: 2, title: 'Card 4', description: 'Description 4' },
            { id: 5, columnId: 3, title: 'Card 5', description: 'Description 5' },
        ]
      }
    },
    methods: {
      updateCards(cards) {
        this.cards = cards;
      },
      deleteColumn() {
        // Emit an event to let the parent component know that the column should be deleted
        this.$emit('delete-column');
      },
      handleCardDrag({ cardId, columnId }) {
      console.log("Card id: ", cardId);
console.log("Column id: ", columnId);
      }
    }
  }
  </script>
  

  