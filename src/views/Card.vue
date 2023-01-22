<template>
    <div>
    <vue-draggable-resizable :w="200" :h="200" :x="0" :y="0">
        <div class="card">
            <h3>{{ title }}</h3>
            <p v-if="isOpen">{{ description }}</p>
            <button @click="openCard">Open</button>
        </div>
    </vue-draggable-resizable>
  </div>

</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      cards: {
        type: Array,
        required: true
      },
      cardId: {
        type: Number,
        required: true
      },
      columnId: {
        type: Number,
        required: true
       }
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      handleDrag() {
        this.$emit('card-dragged', { cardId: this.cardId, columnId: this.columnId });
      },
      openCard() {
        this.isOpen = !this.isOpen
      },
      updateCards() {
        this.$emit('update-cards', this.cards);
      }
    }
  }
  </script>
  
  <style>
    /* Define card class */
    .card {
      padding: 10px;
      margin: 10px 2px;
      background-color: #f5f5f5;
    }
  </style>
  