import { NotImplementedError } from "../extensions/index.js";
import { Node } from '../extensions/list-tree.js';

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
export default class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const insertNode = (node, value) => {
      if (!node) return new Node(value);
      
      if (value === node.data) return node;
      
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else {
        node.right = insertNode(node.right, value);
      }
      
      return node;
    };
    
    this.rootNode = insertNode(this.rootNode, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    const search = (node, value) => {
      if (!node) return null;
      if (value === node.data) return node;
      
      return value < node.data 
        ? search(node.left, value) 
        : search(node.right, value);
    };
    
    return search(this.rootNode, data);
  }

  remove(data) {
    const deleteNode = (node, value) => {
      if (!node) return null;

      if (value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
      }
      
      if (value > node.data) {
        node.right = deleteNode(node.right, value);
        return node;
      }

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = node.right;
      while (successor.left) successor = successor.left;
      
      node.data = successor.data;
      node.right = deleteNode(node.right, successor.data);
      
      return node;
    };

    this.rootNode = deleteNode(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) return null;
    
    let current = this.rootNode;
    while (current.left) current = current.left;
    
    return current.data;
  }

  max() {
    if (!this.rootNode) return null;
    
    let current = this.rootNode;
    while (current.right) current = current.right;
    
    return current.data;
  }
}