class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :recipient_email, :token, :sent_at
end
