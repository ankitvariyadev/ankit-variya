"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [markingRead, setMarkingRead] = useState<number | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/admin/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      alert("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: number) => {
    setMarkingRead(id);
    try {
      await axios.put(`/api/admin/contacts/${id}`, { read: true });
      setContacts(contacts.map(c => c.id === id ? { ...c, read: true } : c));
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, read: true });
      }
    } catch (error) {
      console.error("Failed to mark contact as read:", error);
    } finally {
      setMarkingRead(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`/api/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
      alert("Failed to delete contact");
    }
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount > 0 ? (
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
              </span>
            ) : (
              "All messages have been read"
            )}
          </p>
        </div>
        <motion.button
          onClick={fetchContacts}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl glass text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contacts List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <svg className="animate-spin w-8 h-8 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contacts...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Messages from your contact form will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedContact(contact)}
                  className={`glass rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition-transform ${
                    selectedContact?.id === contact.id ? "ring-2 ring-blue-500" : ""
                  } ${!contact.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {contact.name}
                        </p>
                        {!contact.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{contact.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-1">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {format(new Date(contact.createdAt), "MMM d, h:mm a")}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {!contact.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkRead(contact.id);
                            }}
                            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                            title="Mark as read"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
                          className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Contact Detail */}
        <div className="lg:col-span-1">
          {selectedContact ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Details</h3>
                {!selectedContact.read && (
                  <button
                    onClick={() => handleMarkRead(selectedContact.id)}
                    disabled={markingRead === selectedContact.id}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {markingRead === selectedContact.id ? (
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      "Mark as read"
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedContact.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Received</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {format(new Date(selectedContact.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Message</p>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="w-full py-2 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Message
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center sticky top-24">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a message</h3>
              <p className="text-gray-600 dark:text-gray-400">Choose a message from the list to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
