import { AppDataSource } from "../data-source"
import { Client, Item, User } from "../entity"

const populate = async () => {
  const userRepository = AppDataSource.getRepository(User)
  const clientRepository = AppDataSource.getRepository(Client)
  const itemRepository = AppDataSource.getRepository(Item)

  const dbExist = await itemRepository.findOneBy({id: 1})

  if (dbExist) {
    return
  }

  // Create Users
  const user1 = userRepository.create({firstName: 'Rick', lastName: 'Levine'})
  const user2 = userRepository.create({firstName: 'Bob', lastName: 'Harris'})
  const user3 = userRepository.create({firstName: 'Maggie', lastName: 'Morgan'})
  await userRepository.insert([user1, user2, user3])

  // Create Clients
  const client1 = clientRepository.create({name: 'Best Clothing Brand'})
  const client2 = clientRepository.create({name: 'BearWear'})
  await clientRepository.insert([client1, client2])

  // Create Items
  const item1 = itemRepository.create({title: 'T-Shirt', rate: 25.00})
  const item2 = itemRepository.create({title: 'Sweater', rate: 36.33})
  const item3 = itemRepository.create({title: 'Jeans', rate: 69.99})
  const item4 = itemRepository.create({title: 'Pijamas', rate: 40.00})
  const item5 = itemRepository.create({title: 'Shorts', rate: 28.87})
  await itemRepository.insert([item1, item2, item3, item4, item5])
}

export default populate
