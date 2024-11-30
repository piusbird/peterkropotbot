import { db } from './config.js'
import { Statement } from 'better-sqlite3';

function between(min: number, max: number) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}


async function get_max() {
  var maxrows: string;
  maxrows = "486"
  const stmt = db.prepare("SELECT count(*) FROM quotes");
  stmt.pluck(true)
  var row = stmt.get()!;
  let upper: number = parseInt(row.toString());
  return upper;
}
async function fetch_quote() {
  var lastrow = await get_max();
  var roll = between(1, lastrow)
  const stmt = db.prepare("SELECT quote from quotes where id = (?)");
  stmt.pluck(true)
  const row: object = stmt.get(roll)!;
  return row.toString();
}
export default async function getPostText() {
  // Generate the text for your post here. You can return a string or a promise that resolves to a string
  return fetch_quote();
}
