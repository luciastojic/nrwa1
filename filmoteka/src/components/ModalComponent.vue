<template>
    <div class="modal-overlay" @click.self="zatvori">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalComponent',
    methods: {
      zatvori() {
        this.$emit('zatvori');
      }
    }
  }
  </script>
  
  <style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
  }
  </style>