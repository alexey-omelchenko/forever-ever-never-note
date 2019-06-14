import Kinto from 'kinto'

export default class Store {
  private state: any
  private collectionName: string
  private bucketName: string
  private events: any
  private collection: any

  constructor(bucket, collectionName, events) {
    this.state = {items: []}
    this.collectionName = collectionName
    this.bucketName = bucket
    this.events = events
    this.collection = null
  }

  configure(connection) {
    try {
      const kinto = new Kinto({
        remote: connection.server,
        dbPrefix: connection.user,
        headers: connection.headers,
        bucket: this.bucketName,
      })
      this.collection = kinto.collection(this.collectionName)
    } catch (e) {
      this.onError(e)
    }
  }

  onError(error) {
    this.events.emit('store:busy', false)
    this.events.emit('store:error', error)
  }

  onReady() {
    this.events.emit('store:change', this.state)
    this.events.emit('store:busy', false)
  }

  _execute(promise) {
    this.events.emit('store:busy', true)
    return promise.then(this.onReady.bind(this)).catch(this.onError.bind(this))
  }

  load() {
    return this._execute(
      this.collection.list().then(res => {
        this.state.items = res.data
      })
    )
  }

  create(record) {
    return this._execute(
      this.collection.create(record).then(res => {
        this.state.items.push(res.data)
      })
    ).then(() => {
      this.sync()
    })
  }

  update(record) {
    return this._execute(
      this.collection.update(record).then(res => {
        this.state.items = this.state.items.map(item => {
          return item.id === record.id ? res.data : item
        })
      })
    ).then(() => {
      this.sync()
    })
  }

  delete(record) {
    return this._execute(
      this.collection.delete(record.id).then(res => {
        this.state.items = this.state.items.filter(item => {
          return item.id !== record.id
        })
      })
    )
  }

  sync() {
    this.events.emit('store:busy', true)
    this.collection
      .sync({strategy: Kinto.syncStrategy.SERVER_WINS})
      .then(this.load.bind(this))
      .catch(this.onError.bind(this))
  }
}
